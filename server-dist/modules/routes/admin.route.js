"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _admin = require("../actions/admin.action");

var _utilities = require("../utilities");

var _default = app => {
  //getting post queue
  app //queue stuff
  .get("/admin/verifyAdmin", async (req, res) => {
    let userID = req.query['user_id'];
    let [resp, err] = await (0, _utilities.wrapPromise)((0, _admin.verifyAdminStatus)(userID));

    if (err) {
      res.status(403).send(err);
      return;
    }

    res.status(200).send(resp);
  });
};

exports.default = _default;