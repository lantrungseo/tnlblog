"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishPost = exports.getPosts = void 0;

var _utilities = require("../utilities");

var _db = require("../db");

var _user = require("./user.action");

const getPosts = async (isVerified, id = "") => {
  let endpoint = isVerified ? "verified" : "queue";
  let [data, err] = await (0, _utilities.wrapPromise)((0, _db.getPostData)(endpoint, id));

  if (err) {
    throw new Error("could not access the posts data");
  }

  return data;
};

exports.getPosts = getPosts;

const publishPost = async ({
  accountType,
  accessToken,
  recaptchaToken,
  endpoint
}, {
  title,
  contents,
  images,
  imageTitles
}) => {
  //verify user and captcha
  let [[userResult], verifyError] = await (0, _utilities.wrapPromise)(Promise.all([(0, _user.verifyUserToken)(accountType, accessToken), (0, _user.verifyCaptcha)(recaptchaToken)]));

  if (verifyError) {
    console.log(verifyError);
    throw new Error(verifyError);
  } //save the main content (text content). Retrieve distinct IDs for images


  let author = {
    accountType: accountType,
    id: userResult['user_id']
  };
  let [{
    imageIDs,
    key: postKey
  }, contentSaveErr] = await (0, _utilities.wrapPromise)((0, _db.savePost)(title, contents, imageTitles, endpoint, author));

  if (contentSaveErr) {
    console.log(contentSaveErr);
    throw new Error(contentSaveErr);
  } //upload images


  const [uploadImgURLs, uploadImgErr] = await (0, _utilities.wrapPromise)(Promise.all(images.map(async (file, index) => {
    let imageID = imageIDs[index];
    return (0, _db.uploadImage)(file, imageID);
  })));

  if (uploadImgErr) {
    console.log(uploadImgErr);
    throw new Error(uploadImgErr);
  }

  let [, saveImageToPostErr] = await (0, _utilities.wrapPromise)((0, _db.saveImageToPost)(imageIDs, uploadImgURLs, endpoint, postKey));

  if (saveImageToPostErr) {
    console.log(saveImageToPostErr);
    throw new Error(saveImageToPostErr);
  }

  return "ok";
};

exports.publishPost = publishPost;