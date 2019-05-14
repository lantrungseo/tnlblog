import {AxiosInstance as request, wrapPromise} from '../utilities'

export const PUBLISH_SUCCESS = "SUCCESSFULLY PUBLISH"
export const PUBLISH_FAILURE = "FAIL TO PUBLISH"
export const PUBLISH_START = "START TO PUBLISH"

//actions
  //pure
const publishStart = ()=>({
  type : PUBLISH_START
})
const publishSucceed = ()=>({
  type : PUBLISH_SUCCESS
})

const publishFail = ()=>({
  type : PUBLISH_FAILURE
})

  //non-pure
export const publish = (data, endpoint)=>{
  return async (dispatch)=>{
    dispatch(publishStart());
    let [, err] = await wrapPromise(sendPostToServer(data, endpoint));
    if(err){
      alert(err);
      dispatch(publishFail());
      return;
    }
    dispatch(publishSucceed());
  }
}

//helpers
const sendPostToServer = async ({imgs, title, contents, recaptchaToken}, endpoint)=>{
  if(!title){
    throw new Error("You must enter title");
  }
  if(!contents){
    throw new Error("You must enter content");
  }
  if(!recaptchaToken){
    throw new Error("Please do captcha");
  }
  let data = new FormData();
  let imageTitles = [];
  data.append('title', title);
  data.append('contents', JSON.stringify(contents));
  imgs.forEach(({file, title: imgTitle})=>{
    data.append('images', file);
    imageTitles.push(imgTitle);
  })
  data.append('imageTitles', JSON.stringify(imageTitles));
  let accessToken = sessionStorage.getItem('user_accessToken');
  let accountType = sessionStorage.getItem('user_accountType')
  return request.post("/posts/publish", data, {
    params :{
      accessToken : accessToken,
      recaptchaToken : recaptchaToken,
      accountType : accountType,
      endpoint : endpoint
    }
  })
}
