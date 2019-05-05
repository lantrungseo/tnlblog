import {AxiosInstance as request, wrapPromise} from '../utilities'

export const IS_ADMIN = "IS ADMIN";
export const NOT_ADMIN = "IS NOT ADMIN";

//actions
  //pure
const verifyAdminTrue = ()=>({
  type : IS_ADMIN
})

const verifyAdminFalse = ()=>({
  type: NOT_ADMIN
})

  //impure actions
export const checkAdminStatus = ()=>{
  return async(dispatch)=>{
    let userID = sessionStorage.getItem("user_id");
    let [{data : adminStatus}, err] = await wrapPromise(
      request.get("/admin/verifyAdmin", {
        params : {
          user_id : userID
        }
      })
    )
    if(err || !adminStatus){
      dispatch(verifyAdminFalse());
      return;
    }
    else{
      dispatch(verifyAdminTrue());
      return;
    }
  }
}