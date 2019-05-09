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

export const savePost = async(title, contents, imageTitles, endpoint = "queue")=>{
  let newPostRef = db.ref(`posts/${endpoint}`).push();
  //push images first with fake urls
  let newImagesRef = newPostRef.child("images");
  let [imageIDs, setImageErr] = await wrapPromise(
    Promise.all(
      imageTitles.map(async(title)=>{
        let imageRef= newImagesRef.push()
        let [, setImageFakeErr] = await wrapPromise(
          imageRef.set({url : "haha", title})
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
  //set contents and title
  let newPostContentRef = newPostRef.child("contents");
  let [, setPostErr] =  await wrapPromise(
    Promise.all([
      ...contents.map(async(content)=>{
        for(let contentKey in content){
          if(contentKey==="imageIndex"){
            if(content[contentKey]===-1){
              content[contentKey] = null;
            }
            else{
              content[contentKey] = imageIDs[content[contentKey]];
            }
          }
          else{
            if(!content[contentKey]){
              content[contentKey] = null;
            }
          }
        }
        let[,setPostContentErr] = await wrapPromise(
          newPostContentRef.push().set(content)
        )
        if(setPostContentErr){
          throw new Error(setPostContentErr)
        }
        return "ok";
      }),
      newPostRef.child("title").set(title)
    ])
  )
  if(setPostErr){
    console.log(setPostErr);
    throw new Error(setPostErr);
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
      reject(error);
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

export const getPostData = async (endpoint, id = "")=>{
  return db.ref(`posts/${endpoint}/${id}`).once("value");
  //if pagination added : just choose the limit number larger than number of children of a post
}

//helpers
const getFileExtenstion = (filename)=>{
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}