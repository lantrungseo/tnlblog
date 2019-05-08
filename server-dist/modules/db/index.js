"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPostData = exports.saveImageToPost = exports.uploadImage = exports.savePost = exports.checkAdmin = exports.saveUser = void 0;

var _firebase = require("../../config/firebase");

var _utilities = require("../utilities");

const saveUser = async (accountType, userData) => {
  try {
    let {
      user_id
    } = userData;
    let dataToSave = {};

    for (let key in userData) {
      dataToSave = { ...dataToSave,
        [key]: userData[key]
      };
    }

    return _firebase.database.ref(`users/${accountType}/${user_id}`).set(dataToSave);
  } catch (e) {
    throw new Error(e);
  }
};

exports.saveUser = saveUser;

const checkAdmin = async userID => {
  let [userAdminSnapshot, err] = await (0, _utilities.wrapPromise)(_firebase.database.ref(`admins/${userID}`).once('value'));

  if (err) {
    throw new Error(err);
  }

  return userAdminSnapshot.val();
};

exports.checkAdmin = checkAdmin;

const savePost = async (title, contents, imgsNum, endpoint = "queue") => {
  let newPostRef = _firebase.database.ref(`posts/${endpoint}`).push(); //push images first with fake urls


  let imageFakeURLs = [];
  let newImagesRef = newPostRef.child("images");

  for (let cnt = 1; cnt <= imgsNum; ++cnt) {
    imageFakeURLs = [...imageFakeURLs, "haha"];
  }

  let [imageIDs, setImageErr] = await (0, _utilities.wrapPromise)(Promise.all(imageFakeURLs.map(async url => {
    let imageRef = newImagesRef.push();
    let [, setImageFakeErr] = await (0, _utilities.wrapPromise)(imageRef.set({
      "url": url
    }));

    if (setImageFakeErr) {
      throw new Error(setImageFakeErr);
    }

    return imageRef.key;
  })));

  if (setImageErr) {
    console.log(setImageErr);
    throw new Error(setImageErr);
  } //set contents and title


  let newPostContentRef = newPostRef.child("contents");
  let [res, setPostErr] = await (0, _utilities.wrapPromise)(Promise.all([...contents.map(async content => {
    for (let contentKey in content) {
      if (contentKey === "imageIndex") {
        if (content[contentKey] === -1) {
          content[contentKey] = null;
        } else {
          content[contentKey] = imageIDs[content[contentKey]];
        }
      } else {
        if (!content[contentKey]) {
          content[contentKey] = null;
        }
      }
    }

    let [, setPostContentErr] = await (0, _utilities.wrapPromise)(newPostContentRef.push().set(content));

    if (setPostContentErr) {
      throw new Error(setPostContentErr);
    }

    return "ok";
  }), newPostRef.child("title").set(title)]));

  if (setPostErr) {
    console.log(setPostErr);
    throw new Error(setPostErr);
  }

  return {
    key: newPostRef.key,
    imageIDs
  };
};

exports.savePost = savePost;

const uploadImage = async (file, id) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No image to upload here");
    }

    let newName = `${id}.${getFileExtenstion(file.originalname)}`;

    let fileUpload = _firebase.storage.file(newName);

    let blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimeType
      }
    });
    blobStream.on('error', error => {
      reject("could not upload the image");
    });
    blobStream.on("finish", async () => {
      const url = `https://storage.googleapis.com/${_firebase.storage.name}/${fileUpload.name}`;
      let [, err] = await (0, _utilities.wrapPromise)(fileUpload.makePublic());

      if (err) {
        reject(err);
      }

      resolve(url);
    });
    blobStream.end(file.buffer);
  });
};

exports.uploadImage = uploadImage;

const saveImageToPost = async (imageKeys, imageURLs, endpoint, key) => {
  let postImageRef = _firebase.database.ref(`posts/${endpoint}/${key}/images`);

  return Promise.all(imageKeys.map(async (imageKey, index) => {
    let url = imageURLs[index];
    return postImageRef.child(imageKey).update({
      url
    });
  }));
};

exports.saveImageToPost = saveImageToPost;

const getPostData = async endpoint => {
  return _firebase.database.ref(`posts/${endpoint}`).once("value");
}; //helpers


exports.getPostData = getPostData;

const getFileExtenstion = filename => {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
};