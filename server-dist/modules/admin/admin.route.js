"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _admin = require("./admin.action");

var _middlewares = require("../../config/middlewares");

var _default = app => {
  //getting post queue
  app //queue stuff
  .get("/admin/verifyAdmin", (req, res) => {
    let userID = req.query['user_id'];
    (0, _admin.verifyAdminStatus)(userID) //succeeed
    .then(resp => res.status(200).send(resp)) //fail
    .catch(err => res.status(403).send(err));
  }).post("/admin/post", _middlewares.fileHandler.array("images", 10), (req, res) => {
    let {
      accessToken,
      accountType,
      recaptchaToken
    } = req.query;
    let {
      content,
      title
    } = req.body;
    console.log(content);
    console.log(title);
    let images = req.files;
    console.log(images.length);
    (0, _admin.publishPost)({
      accountType,
      accessToken,
      recaptchaToken
    }, {
      title,
      content,
      images
    }).then(resp => res.status(200).send(resp)).catch(err => res.status(403).send(err));
  });
};

exports.default = _default;