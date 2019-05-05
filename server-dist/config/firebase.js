"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = exports.database = void 0;

var firebaseAdmin = _interopRequireWildcard(require("firebase-admin"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(require('./firebase_service_account.json')),
  databaseURL: "https://trungnglanblog.firebaseio.com",
  storageBucket: "trungnglanblog.appspot.com"
});
const database = firebaseAdmin.database();
exports.database = database;
const storage = firebaseAdmin.storage().bucket();
exports.storage = storage;