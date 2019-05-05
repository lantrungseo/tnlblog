import {
  IS_ADMIN, NOT_ADMIN
} from './Admin.action'


export default (state = {}, action)=>{
  let {type} = action;
  switch(type){
    case IS_ADMIN : return {...state, isAdmin : true}
    case NOT_ADMIN: return {...state, isAdmin : false}
    default : return state;
  }
}