import {AxiosInstance as request, wrapPromise, asyncOperate} from '../utilities'
import Reddit from '../reddit'

export const IS_AUTHED = 'LOGGED IN'
export const IS_UNAUTHED = 'LOGGED OUT'
export const FB_SDK_READY = 'FB SDK READY'

//actions
  //pure actions
const userAuthed = ()=>({
  type : IS_AUTHED,
})

const userUnAuthed = ()=>{  
  Object.keys(sessionStorage).forEach(key=>{
    if(key.substr(0, 4) === "user"){
      sessionStorage.removeItem(key);
    }
  })
  return {
    type : IS_UNAUTHED
  }
}

export const fbSdkReady = ()=>({
  type : FB_SDK_READY
})

  //non-pure actions
export const checkLoginStatus = ()=>{
  return async (dispatch)=>{
    let results = await asyncOperate(
      checkUserTokenLocal('fb'),
      checkUserTokenLocal('reddit')
    ) 
    let isAuthed = true;
    results.forEach(([result, err])=>{
      isAuthed &= (!err && result);
    });
    if(isAuthed){
      dispatch(userAuthed());
      dispatch(userUnAuthed())
    }
  }
}

export const fbLogin = ()=>{
  return async (dispatch, getState)=>{
    let {AuthReducer} = getState()
    let {isFbSdkReady} = AuthReducer
    if(!isFbSdkReady){
      dispatch(userUnAuthed());
      return;
    }
    //login with facebook
    let [response, err] = await wrapPromise(continueWithFacebook());
    if(err){
      dispatch(userUnAuthed());
      return;
    }
    //retrieve access token, check and save info
    let {accessToken} = response;
    saveDataLocal({
      'user_accountType' : 'fb',
      'user_accessToken': accessToken
    });
    let [, checkTokenErr] = await wrapPromise(checkUserTokenLocal('fb', true));
    if(checkTokenErr){
      dispatch(userUnAuthed())
      return;
    }
    dispatch(userAuthed())
  }
}

export const redditLogin = ()=>{
  return async(dispatch)=>{
    let [accessToken, error] = await wrapPromise(continueWithReddit())
    if(error){
      dispatch(userAuthed());
      return;
    }
    saveDataLocal({
      "user_accountType" : 'reddit',
      "user_accessToken" : accessToken
    })
    let [, err] = await wrapPromise(checkUserTokenLocal('reddit', true))
    if(err){
      dispatch(userUnAuthed())
      return;
    }
    dispatch(userAuthed())
  }
}

//helpers

  //check to see the local database still contains valid user access token
const checkUserTokenLocal = async (accountType, isDataSave)=>{
  //retrieve previous saved access token. If null => throw
  let accessToken = sessionStorage.getItem(`user_accessToken`)

  //post to server for token verification and saving
  if(!accessToken){
    throw new Error(`${accountType} Access Token disappeared`)
  } 
  let [result, error] = await wrapPromise(verifyToken(accountType, accessToken, isDataSave))
  if(error){
    throw new Error("Invalidate access token")
  } 
  //modify other user value and return
  let {data} = result;
  saveDataLocal(data)
  return "ok";
}

  //verify token on server
const verifyToken =  async (accountType, accessToken, isDataSave) =>{
  return request.get("/user/verifyToken", {
    params:{
      accountType : accountType,
      accessToken : accessToken,
      isDataSave : isDataSave
    }
  })
}

  //modify and save user locally
const saveDataLocal = (data)=>{
  for(let key in data){
    if(data[key]){
      sessionStorage.setItem(key, data[key])
    }
  }  
}

//facebook login flow
const continueWithFacebook = ()=>{
  return new Promise((resolve, reject)=>{
    let {FB} = window;
    FB.login((response)=>{
      let {status, authResponse: res} = response;
      if(status !== "connected"){
        reject(new Error("User do not like my app huhu :("))
      } 
      resolve(res)
    })
  })
}


//reddit login flow
const continueWithReddit = ()=>{
  return new Promise(
    (resolve, reject)=>{
      Reddit.login(
        (accessToken)=>{
          resolve(accessToken)
        },
        (e)=>{
          reject(e);
        }
      )
    }
  )
}


