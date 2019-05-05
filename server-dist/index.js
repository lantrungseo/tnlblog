"use strict";

var _express = _interopRequireDefault(require("express"));

var _middlewares = _interopRequireDefault(require("./config/middlewares"));

var _modules = _interopRequireDefault(require("./modules"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
(0, _middlewares.default)(app, _express.default);
(0, _modules.default)(app); //listen

const PORT = process.env.PORT || 2828;
app.listen(PORT, () => {
  console.log("app listen on port ", PORT);
});