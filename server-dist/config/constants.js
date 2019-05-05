"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.captchaKey = exports.captchaApi = exports.redditAuthHeader = exports.redditAPI = exports.fbAppAccessToken = exports.fbGraphURL = void 0;
//facebook
const fbGraphURL = 'https://graph.facebook.com';
exports.fbGraphURL = fbGraphURL;
const fbAppAccessToken = '307132569973108|g09CHMNOSSt4bld9rUqxeYWeATw'; //reddit

exports.fbAppAccessToken = fbAppAccessToken;
const redditAPI = "https://oauth.reddit.com/api";
exports.redditAPI = redditAPI;
const redditAuthHeader = "bearer"; //captcha

exports.redditAuthHeader = redditAuthHeader;
const captchaApi = "https://www.google.com/recaptcha/api/siteverify";
exports.captchaApi = captchaApi;
const captchaKey = "6LeDAZ4UAAAAAIfho-MrUGPx2Y5063hxZOgDamT4";
exports.captchaKey = captchaKey;