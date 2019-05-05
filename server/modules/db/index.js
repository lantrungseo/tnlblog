import {database as db, storage} from '../../config/firebase'
import {wrapPromise} from '../utilities'

export const saveUser = async (accountType, userData)=>{
  try{
    let {user_id} = userData
    let dataToSave = {}
    for(let key in userData){
      dataToSave = {
        ...dataToSave,
        [key] : userData[key]
      }
    }
    return db.ref(`users/${accountType}/${user_id}`).set(dataToSave)
  }
  catch(e){
    throw new Error(e);
  }
}

export const checkAdmin = async(userID)=>{
  let [userAdminSnapshot, err] = await wrapPromise(db.ref(`admins/${userID}`).once('value'));
  if(err){
    throw new Error(err);
  }
  return userAdminSnapshot.val()
}

export const savePost = async(title, content, imgsNum, endpoint = "queue")=>{
  let newPostRef = db.ref(`posts/${endpoint}`).push();
  let [, setPostErr] =  await wrapPromise(
    newPostRef.set({
      title, content
    })
  )
  if(setPostErr){
    return new Error(setPostErr);
  }
  let imageFakeURLs = [];
  let newImagesRef = newPostRef.child("images");
  for(let cnt = 1; cnt <= imgsNum; ++cnt){
    imageFakeURLs = [...imageFakeURLs, "haha"];
  }
  let [imageIDs, setImageErr] = await wrapPromise(
    Promise.all(
      imageFakeURLs.map(async (url)=>{
        let imageRef= newImagesRef.push()
        let [, setImageFakeErr] = await wrapPromise(
          imageRef.set({
            "url" : url
          })
        )
        if(setImageFakeErr){
          throw new Error(setImageFakeErr);
        }
        return imageRef.key;
      })
    )
  )
  if(setImageErr){
    console.log(setImageErr);
    throw new Error(setImageErr)
  }
  return {key: newPostRef.key, imageIDs};
}

export const uploadImage = async (file, id)=>{
  return new Promise((resolve, reject)=>{
    if(!file){
      reject("No image to upload here");
    }
    let newName = `${id}.${getFileExtenstion(file.originalname)}`;
    let fileUpload = storage.file(newName);
    let blobStream = fileUpload.createWriteStream({
      metadata : {
        contentType : file.mimeType
      }
    })
    blobStream.on('error', (error)=>{
      reject("could not upload the image");
    })
    blobStream.on("finish", async ()=>{
      const url = `https://storage.googleapis.com/${storage.name}/${fileUpload.name}`
      let [, err] = await wrapPromise(fileUpload.makePublic());
      if(err){
        reject(err);
      }
      resolve(url);
    })
    blobStream.end(file.buffer)
  })
}


export const saveImageToPost = async (imageKeys, imageURLs, endpoint, key)=>{
  let postImageRef = db.ref(`posts/${endpoint}/${key}/images`);
  return Promise.all(
    imageKeys.map(async (imageKey, index)=>{
      let url = imageURLs[index];
      return postImageRef.child(imageKey).update({
        url 
      });
    })
  )
}

export const getPostData = async (endpoint)=>{
  return db.ref(`posts/${endpoint}`).once("value");
}

//helpers
const getFileExtenstion = (filename)=>{
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}