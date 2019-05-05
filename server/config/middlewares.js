import * as bodyParser from 'body-parser'
import cors from 'cors'
import multer from 'multer'

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

export const fileHandler = multer(multer.memoryStorage());