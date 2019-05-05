import {verifyAdminStatus} from '../actions/admin.action'
import {wrapPromise} from '../utilities'

export default (app)=>{
  //getting post queue
  app
    //queue stuff
    .get("/admin/verifyAdmin", async (req, res)=>{
      let userID = req.query['user_id'];
      let [resp,err] = await wrapPromise(verifyAdminStatus(userID));
      if(err){
        res.status(403).send(err);
        return;
      }
      res.status(200).send(resp);
    })
}