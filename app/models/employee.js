const mongoose= require('mongoose')
const validator= require('validator')
const Schema = mongoose.Schema
const employeeSchema= new Schema({
    name:{
        type: String,
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
                return 'Email is not valid'
            }
        }
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(values){
                return validator.isNumeric(values)
            },
            message:function(){
                return 'Mobile should contain only numbers'
            }
        }
    },
    department:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Department'
    }
})

const Employee= mongoose.model('Employee',employeeSchema)
module.exports=Employee