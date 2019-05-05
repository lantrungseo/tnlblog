"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = require("./user.action");

const maxImagesCount = 10;

var _default = app => {
  app //login and verifying
  .get("/user/verifyToken", (req, res) => {
    let {
      accountType,
      accessToken,
      isDataSave
    } = req.query;
    (0, _user.verifyUserToken)(accountType, accessToken, isDataSave) //succeed
    .then(result => res.status(200).send(result)) //fail
    .catch(err => res.status(403).send("forbidden"));
  }) //verify captcha
  .get("/user/verifyCaptcha", (req, res) => {
    let {
      recaptchaToken
    } = req.query;
    console.log("token");
    (0, _user.verifyCaptcha)(recaptchaToken) //succeed
    .then(() => res.status(200).send("ok")) //fail
    .catch(err => res.status(403).send(err));
  }) //adding post suggestions and comments
  .post("/user/suggests", (req, res) => {}).post("/user/comments", (req, res) => {});
};

exports.default = _default;