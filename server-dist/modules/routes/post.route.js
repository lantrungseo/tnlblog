"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _post = require("../actions/post.action");

var _utilities = require("../utilities");

var _middlewares = require("../../config/middlewares");

var _default = app => {
  app //get posts data
  .get("/posts/verified", async (req, res) => {
    let [data, err] = await (0, _utilities.wrapPromise)((0, _post.getPosts)(true, req.query.id));

    if (err) {
      res.status(403).send(err);
    }

    res.status(200).send(data);
  }) //publish post
  .post("/posts/publish", _middlewares.fileHandler.array("images", 10), _middlewares.imageResizer, async (req, res) => {
    let {
      contents,
      title,
      imageTitles
    } = req.body;
    let images = req.files;
    contents = JSON.parse(contents);
    imageTitles = JSON.parse(imageTitles);
    let [resp, err] = await (0, _utilities.wrapPromise)((0, _post.publishPost)(req.query, {
      title,
      contents,
      images,
      imageTitles
    }));

    if (err) {
      res.status(403).send(err);
      return;
    }

    res.status(200).send(resp);
  });
};

exports.default = _default;