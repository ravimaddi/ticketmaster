const mongoose = require('mongoose')
const connectDb=()=>{
    mongoose.connect('mongodb://localhost:27017/ticket-manager', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log('connected to db')
    })
    .catch((err)=>{
        console.log(err)
    })
} 
module.exports=connectDb