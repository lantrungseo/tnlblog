import {wrapPromise} from '../utilities'
import {getPostData, savePost, uploadImage, saveImageToPost} from '../db'
import {verifyCaptcha, verifyUserToken} from './user.action'

export const getPosts = async (isVerified)=>{
  let endpoint = (isVerified ? "verified" : "queue");
  let [data, err] = await wrapPromise(getPostData(endpoint));
  if(err){
    throw new Error("could not access the posts data");
  }
  //data now is a db snapshot, so call data.val() to get value
  return data.val();
}

export const publishPost = async(
  {accountType, accessToken, recaptchaToken, isInQueue}, 
  {title, content, images}
)=>{
  //verify user and captcha
  let[,verifyError] = await wrapPromise(
    Promise.all([
      verifyUserToken(accountType, accessToken),
      verifyCaptcha(recaptchaToken)
    ])
  )
  if(verifyError){
    console.log(verifyError);
    throw new Error(verifyError);
  }

//save the main content (text content). Retrieve distinct IDs for images
  let endpoint = (isInQueue ? "queue" : "verified");
  let [{imageIDs, key: postKey}, contentSaveErr] = await wrapPromise(
    savePost(title, content, images.length, endpoint)
  );
  if(contentSaveErr){
    throw new Error(contentSaveErr);
  }
  //upload images
  const [uploadImgURLs, uploadImgErr] = await wrapPromise(
    Promise.all(
      images.map(async(file, index)=>{
        let imageID = imageIDs[index];
        return uploadImage(file, imageID)
      })
    )
  )
  if(uploadImgErr){
    console.log(uploadImgErr);
    throw new Error(uploadImgErr);
  }
  let [, saveImageToPostErr] = await wrapPromise(
    saveImageToPost(imageIDs, uploadImgURLs, endpoint, postKey)
  )
  if(saveImageToPostErr){
    console.log(saveImageToPostErr);
    throw new Error(saveImageToPostErr);
  }
  return "ok";
}