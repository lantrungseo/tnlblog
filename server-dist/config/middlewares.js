"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileHandler = exports.default = void 0;

var bodyParser = _interopRequireWildcard(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const whiteLists = ['http://localhost:3000'];
const corsError = "Cors disabled. Requests denied";

var _default = (app, express) => {
  //json parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  })); //cors

  app.use((0, _cors.default)({
    origin: (origin, callback) => {
      if (!origin || whiteLists.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error(corsError));
      }
    }
  })); //static files (--serve for production)
};

exports.default = _default;
const fileHandler = (0, _multer.default)(_multer.default.memoryStorage());
exports.fileHandler = fileHandler;