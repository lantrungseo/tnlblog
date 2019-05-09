import {getPosts, publishPost} from '../actions/post.action'
import {wrapPromise} from '../utilities'
import {fileHandler} from '../../config/middlewares'
export default (app)=>{
  app
    //get posts data
    .get("/posts/verified", async(req, res)=>{
      let [data, err] = await wrapPromise(getPosts(true, req.query.id));
      if(err){
        res.status(403).send(err);
      }
      res.status(200).send(data);
    })
    //publish post
    .post("/posts/publish", fileHandler.array("images", 10), async (req, res)=>{
      let {contents, title, imageTitles} = req.body;
      let images = req.files;
      contents = JSON.parse(contents);
      imageTitles = JSON.parse(imageTitles);
      let [resp, err]= await wrapPromise(
        publishPost(
          req.query,
          {
            title, contents, images, imageTitles
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