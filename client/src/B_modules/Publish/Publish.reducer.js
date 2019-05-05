import {
  PUBLISH_FAILURE, PUBLISH_START, PUBLISH_SUCCESS
} from './Publish.action'

const initialState = {}
export default (state = initialState, action)=>{
  let{type} = action;
  switch(type){
    case PUBLISH_FAILURE: return {...state, publishState: "fail"}
    case PUBLISH_START : return {...state, publishState : "start"}
    case PUBLISH_SUCCESS : return {...state, publishState: "succeed"}
    default : return state;
  }
}