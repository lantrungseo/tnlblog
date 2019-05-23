import {verifyUserToken} from '../actions/user.action'
import { wrapPromise } from '../utilities';


export default (app)=>{
  app
    //login and verifying
    .get("/user/verifyToken", async (req, res)=>{
        let {accountType, accessToken, isDataSave} = req.query;
        let [result, err] = await wrapPromise(
          verifyUserToken(accountType, accessToken, isDataSave)
        )
        if(err){
          return res.status(403).send("forbidden");
        }
        res.status(200).send(result)
    })
}