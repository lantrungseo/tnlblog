import * as bodyParser from 'body-parser'
import cors from 'cors'
import multer from 'multer'
import sharp from 'sharp'

const whiteLists = ['http://localhost:3000']
const corsError = "Cors disabled. Requests denied"

export default (app, express)=>{
    //json parser
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
    //cors
    app.use(
        cors({
            origin : (origin, callback)=>{
                if(!origin || whiteLists.indexOf(origin) !== -1){
                    callback(null, true)
                } else{
                    callback(new Error(corsError))
                }
            }
        })
    )
    //static files (--serve for production)
}
//image handler
export const fileHandler = multer(multer.memoryStorage());
//image resize middleware
export const imageResizer = (req, res, next)=>{
    if(!req.files || !req.files.length){
        next();
    }
    resizeImages(req.files)
        .then(
            (images)=>{
                for(let i=0; i< images.length; ++i){
                    images[i] = {
                        buffer : images[i],
                        originalname : req.files[i].originalname,
                        mimetype: req.files[i].mimetype
                    }
                }
                req.files = images;
                next();
            }
        )
        .catch(e=>{
            res.status(500).send(e);
        })
}

//helpers
const resizeImages = async (images)=>{
    return Promise.all(
        images.map(async(image)=>{
            return sharp(image.buffer, {
                    enlarge: false
                })
                .resize(50, 50)
                .toBuffer()
        })
    )
}