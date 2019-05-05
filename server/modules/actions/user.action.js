import {
  AxiosInstance as request, wrapPromise
} from '../utilities'

import {
  fbGraphURL, 
  redditAPI, redditAuthHeader,
  captchaApi, captchaKey
} from '../../config/constants'

import {saveUser} from '../db'

//main action
export const verifyUserToken  = async (accountType, accessToken, isDataSave=false)=>{
  if(!accountType || !accessToken){
    throw new Error("lacking params")
  } 
  let ans;
  if(accountType === "fb"){
    ans = await wrapPromise(verifyFacebookToken(accessToken))
  }
  if(accountType === "reddit"){
    ans = await wrapPromise(verifyRedditToken(accessToken))
  }
  let [result, err] = ans;
  if(err){
    throw new Error('bitch, invalidate token')
  } 
  let {data: userData} = result;
  if(accountType === "reddit"){
    console.log(userData);
  }
  userData = filterUserData(accountType, userData)
  if(isDataSave){
    let [, saveUserErr] = await wrapPromise(saveUser(accountType, userData))
    if(saveUserErr){
      throw new Error(saveUserErr)
    }
  }
  return userData;
}

//facebook verify
const verifyFacebookToken = async (accessToken) =>{
  return request.get(`${fbGraphURL}/me`,{
      params:{
        fields : "id,picture,name", 
        access_token : accessToken
      }
    })
}

//reddit verify
const verifyRedditToken = async (accessToken)=>{
  return request.get(`${redditAPI}/v1/me`, {
      headers :{
        Authorization: `${redditAuthHeader} ${accessToken}`
      }
    })
}

//captcha verify
export const verifyCaptcha  = async (captchaToken)=>{
  let [{data}, err] = await wrapPromise(
    request.post(captchaApi, null, {
        params:{
          "secret": captchaKey,
          "response": captchaToken
        }
    })
  )

  if(err || !data.success){
    throw new Error("invalidate captcha");
  }
  return "ok";
}

//helpers
  //filter user data
const filterUserData = (accountType,data)=>{
  let result = {}
  if(accountType === 'fb'){
    for(let key in data){
        //picture key is different
      if(key === "picture"){
        result = {
          ...result,
          [`user_${key}`] : data[key].data.url
        }
      }
      else{
        result = {
          ...result,
          [`user_${key}`]: data[key]
        }
      }
    }
  }
  if(accountType === 'reddit'){
    let {name, id, icon_img : profilePic} = data;
    result = {
      ...result,
      user_name : name,
      user_id : id,
      user_picture : profilePic
    }
  }
  return result
}