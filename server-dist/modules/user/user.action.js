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
    console.log(err);
    throw new Error('bitch, invalidate token');
  }

  let {
    data: userData
  } = result;
  userData = (0, _utilities.filterUserData)(accountType, userData);

  if (isDataSave) {
    let [saveUserResult,, saveUserErr] = await (0, _utilities.wrapPromise)((0, _db.saveUser)(accountType, userData));

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
  let [res, err] = await (0, _utilities.wrapPromise)(_utilities.AxiosInstance.post(_constants.captchaApi, null, {
    params: {
      "secret": "",
      "response": captchaToken
    }
  }));
  console.log(res['data']);

  if (error || !res.success) {
    throw new Error("invalidate captcha");
  }

  return "ok";
};

exports.verifyCaptcha = verifyCaptcha;