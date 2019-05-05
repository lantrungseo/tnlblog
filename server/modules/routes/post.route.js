import {getPosts, publishPost} from '../actions/post.action'
import {wrapPromise} from '../utilities'
import {fileHandler} from '../../config/middlewares'
export default (app)=>{
  app
    //get posts data
    .get("/posts/verified", async(req, res)=>{
      let [data, err] = await wrapPromise(getPosts(true));
      if(err){
        res.status(403).send(err);
      }
      res.status(200).send(data);
    })
    //publish post
    .post("/posts/publish", fileHandler.array("images", 10), async (req, res)=>{
      let {content, title} = req.body;
      let images = req.files;
      let [resp, err]= await wrapPromise(
        publishPost(
          req.query,
          {
            title, content, images
          }
        )
      )
      if(err){
        res.status(403).send(err)
        return;
      }
      res.status(200).send(resp)
    })
}