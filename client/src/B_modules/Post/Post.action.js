import {AxiosInstance as request, wrapPromise} from '../utilities'

//action types
export const GET_POSTS_SUCCESS =  "POST SUCCESS"
export const GET_POSTS_FAILURE = "POST FAIL"
export const GETTING_POSTS = "GETTING POST"

//pure actions
const succeedGetPosts = (data)=>({
    type : GET_POSTS_SUCCESS,
    data
})

const failGetPosts = ()=>({
  type : GET_POSTS_FAILURE
})

const gettingPosts = ()=>({
  type : GETTING_POSTS
})

//impure actions
export const getPosts = ()=>{
  return async (dispatch)=>{
    dispatch(gettingPosts());
    let [{data: posts}, err] = await wrapPromise(getPostData());
    if(err){
      dispatch(failGetPosts());
      return;
    }
    dispatch(succeedGetPosts(posts));
  }
}

//helpers
const getPostData = async ()=>{
  return request.get("/posts/verified");
}
