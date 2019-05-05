import {
  GETTING_POSTS, GET_POSTS_FAILURE, GET_POSTS_SUCCESS
} from './Post.action'

const initialState = {}

export default (state = initialState, action)=>{
  let {type, data} = action;
  switch(type){
    case GETTING_POSTS: return {...state, getPostState : undefined}
    case GET_POSTS_FAILURE : return {...state, getPostState : "failed"}
    case GET_POSTS_SUCCESS : return {...state, getPostState: "done", posts: data}
    default : return state;
  }
}