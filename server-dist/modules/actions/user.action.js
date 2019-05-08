"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyCaptcha = exports.verifyUserToken = void 0;

var _utilities = require("../utilities");

var _constants = require("../../config/constants");

var _db = require("../db");

//main action
const verifyUserToken = async (accountType, accessToken, isDataSave = false) => {
  if (!accountType || !accessToken) {
    throw new Error("lacking params");
  }

  let ans;

  if (accountType === "fb") {
    ans = await (0, _utilities.wrapPromise)(verifyFacebookToken(accessToken));
  }

  if (accountType === "reddit") {
    ans = await (0, _utilities.wrapPromise)(verifyRedditToken(accessToken));
  }

  let [result, err] = ans;

  if (err) {
    throw new Error('bitch, invalidate token');
  }

  let {
    data: userData
  } = result;
  userData = filterUserData(accountType, userData);

  if (isDataSave) {
    let [, saveUserErr] = await (0, _utilities.wrapPromise)((0, _db.saveUser)(accountType, userData));

    if (saveUserErr) {
      throw new Error(saveUserErr);
    }
  }

  return userData;
}; //facebook verify


exports.verifyUserToken = verifyUserToken;

const verifyFacebookToken = async accessToken => {
  return _utilities.AxiosInstance.get(`${_constants.fbGraphURL}/me`, {
    params: {
      fields: "id,picture,name",
      access_token: accessToken
    }
  });
}; //reddit verify


const verifyRedditToken = async accessToken => {
  return _utilities.AxiosInstance.get(`${_constants.redditAPI}/v1/me`, {
    headers: {
      Authorization: `${_constants.redditAuthHeader} ${accessToken}`
    }
  });
}; //captcha verify


const verifyCaptcha = async captchaToken => {
  let [{
    data
  }, err] = await (0, _utilities.wrapPromise)(_utilities.AxiosInstance.post(_constants.captchaApi, null, {
    params: {
      "secret": _constants.captchaKey,
      "response": captchaToken
    }
  }));

  if (err || !data.success) {
    console.log("captcha err ", err);
    console.log(data);
    throw new Error("invalidate captcha");
  }

  return "ok";
}; //helpers
//filter user data


exports.verifyCaptcha = verifyCaptcha;

const filterUserData = (accountType, data) => {
  let result = {};

  if (accountType === 'fb') {
    for (let key in data) {
      //picture key is different
      if (key === "picture") {
        result = { ...result,
          [`user_${key}`]: data[key].data.url
        };
      } else {
        result = { ...result,
          [`user_${key}`]: data[key]
        };
      }
    }
  }

  if (accountType === 'reddit') {
    let {
      name,
      id,
      icon_img: profilePic
    } = data;
    result = { ...result,
      user_name: name,
      user_id: id,
      user_picture: profilePic
    };
  }

  return result;
};