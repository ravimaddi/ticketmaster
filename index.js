const express= require('express')
const connectDb=require('./config/database')
const app = express()
const port = 3000
const router = require('./config/routes')
app.use(express.json())
connectDb()
app.use('/',router)
app.listen(port,()=>{
    console.log('listening on the port',port)
})