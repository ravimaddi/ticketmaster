const mongoose = require('mongoose')
const validator=require('validator')
const Schema = mongoose.Schema
const customerSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(values){
               return validator.isEmail(values)
            },
            message:function(){
                return 'Invalid Email Format'
            }   
        }
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        minlength:10,
        maxlength:10,
        validate:{
            validator:function(values){
                return validator.isNumeric(values)
            },
            message:function(){
                return 'Mobile Number must contain only numbers'
            }
        }
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
})
const Customer=mongoose.model('Customer',customerSchema)
module.exports=Customer