import {
  IS_AUTHED, IS_UNAUTHED, FB_SDK_READY
} from './Auth.action'


export default (state = {}, action)=>{
  let {type} = action
  switch(type){
    case IS_AUTHED : return {...state, isAuthed : true};
    case IS_UNAUTHED : return {...state, isAuthed : false}
    case FB_SDK_READY : return {...state, isFbSdkReady : true};
    default : return state;
  }
}