"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapPromise = exports.AxiosInstance = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AxiosInstance = _axios.default.create({
  timeout: 15000,
  validateStatus: status => {
    return status >= 200 && status < 300;
  }
});

exports.AxiosInstance = AxiosInstance;

const wrapPromise = promise => {
  return promise.then(data => [data, null]).catch(err => [null, err]);
};

exports.wrapPromise = wrapPromise;