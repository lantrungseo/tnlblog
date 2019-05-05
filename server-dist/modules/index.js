"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("./routes/user.route"));

var _admin = _interopRequireDefault(require("./routes/admin.route"));

var _post = _interopRequireDefault(require("./routes/post.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = app => {
  (0, _user.default)(app);
  (0, _admin.default)(app);
  (0, _post.default)(app);
};

exports.default = _default;