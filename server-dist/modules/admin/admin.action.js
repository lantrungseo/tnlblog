"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishPost = exports.verifyAdminStatus = void 0;

var _utilities = require("../utilities");

var _db = require("../db");

const verifyAdminStatus = async userID => {
  return (0, _db.checkAdmin)(userID);
};

exports.verifyAdminStatus = verifyAdminStatus;

const publishPost = async ({
  accountType,
  accessToken,
  recaptchaToken
}, {
  title,
  content,
  images
}) => {
  let [, verifyError] = await (0, _utilities.wrapPromise)( //Promise.all([

  /*request.get("http://localhost:2828/user/verifyToken", {
    params:{
      accountType : accountType,
      accessToken : accessToken,
      isDataSave : false
    }
  }),*/
  _utilities.AxiosInstance.get("http://localhost:2828/user/verifyCaptcha", {
    params: {
      recaptchaToken: recaptchaToken
    }
  }) //])
  );

  if (verifyError) {
    console.log(verifyError);
    throw new Error(verifyError);
  }

  return "ok";
};

exports.publishPost = publishPost;