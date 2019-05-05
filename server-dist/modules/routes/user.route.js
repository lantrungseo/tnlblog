"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = require("../actions/user.action");

var _utilities = require("../utilities");

var _default = app => {
  app //login and verifying
  .get("/user/verifyToken", async (req, res) => {
    let {
      accountType,
      accessToken,
      isDataSave
    } = req.query;
    let [result, err] = await (0, _utilities.wrapPromise)((0, _user.verifyUserToken)(accountType, accessToken, isDataSave));

    if (err) {
      res.status(403).send("forbidden");
      return;
    }

    res.status(200).send(result);
  });
};

exports.default = _default;