import {checkAdmin} from '../db'


export const verifyAdminStatus = async (userID)=>{
  return checkAdmin(userID)
}

