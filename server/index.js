import express from 'express'
import middleWare from './config/middlewares'
import getSetReadyGo from './modules'

const app = express()
middleWare(app, express)
getSetReadyGo(app)

//listen
const PORT = process.env.PORT || 2828
app.listen(PORT, ()=>{
    console.log("app listen on port ", PORT)
})