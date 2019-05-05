"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyAdminStatus = void 0;

var _db = require("../db");

const verifyAdminStatus = async userID => {
  return (0, _db.checkAdmin)(userID);
};

exports.verifyAdminStatus = verifyAdminStatus;