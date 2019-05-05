export default {
  login :(success, failure)=>{
    window.redditCallback = (hashValue)=>{
      try{
        let accessToken = redditGetAccessToken(hashValue);
        if(accessToken){
          success(accessToken);
        }
        else{
          failure(new Error("non-exist access token"))
        }
      }
      catch(e){
        failure(e);
      }
    }
    redditAuthPopup();
  }
}

const redditGetAccessToken = (hashValue)=>{  
  let hashValueArr = hashValue.split(/=|&/);
  let errorIndex= hashValueArr.indexOf('error')
  let stateIndex = hashValueArr.indexOf('state')
  let accessTokenIndex = hashValueArr.indexOf('access_token')
  if(errorIndex !== -1){
    let error = hashValueArr[errorIndex+1]
    throw new Error(error)
  }
  if(stateIndex !== -1 && hashValueArr[stateIndex+1] === sessionStorage.getItem('user_redditAuthState')){
    //cool, save your code
    sessionStorage.removeItem("user_redditAuthState");
    let accessToken = hashValueArr[accessTokenIndex+1];
    return accessToken;
  }
}

  //redirect to reddit login page
const redditAuthPopup = ()=>{
  let redditPopup = window.open(getRedditAuthURL(), "Continue with Reddit");
  redditPopup.window.focus();
}

  //get the reddit login url
const getRedditAuthURL = ()=>{
  let state = generateState();
  let redditAuthURL =  `https://www.reddit.com/api/v1/authorize?`
  let params = {
    client_id : "j6NLU1hHpv-NVw",
    response_type : "token",
    redirect_uri : `${window.location.origin}/auth/redirect`,
    state : state,
    duration : "temporary",
    scope : "identity"
  }
  let keysArr = Object.keys(params);
  keysArr.forEach((key, index)=>{
    redditAuthURL += `${key}=${params[key]}`;
    if(index !== keysArr.length-1){
      redditAuthURL += '&'
    }
  })
  return redditAuthURL;
}
const generateState = ()=>{
  //session storage key : "user_redditAuthState"
  let randomstr =  
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  sessionStorage.setItem("user_redditAuthState", randomstr)
  return randomstr;
}