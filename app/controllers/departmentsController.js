const Department = require('../models/department')
const Ticket = require('../models/ticket')
module.exports.list=(req,res)=>{
    Department.find()
    .then((departments)=>{
        res.json(departments)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.create=(req,res)=>{
    const {body}= req
    const department=new Department(body)
    department.save()
    .then((department)=>{
        res.json(department)
    })
    .catch((err)=>{
        res.json(err)
    })
}
module.exports.show=(req,res)=>{
    Department.findById(req.params.id)
    .then((department)=>{
        if(department){
            res.json(department)
        }
        else{
            res.json({})
        }
    })
    .catch((err)=>{
        res.json(err)
    })
}
module.exports.update=(req,res)=>{
    const id = req.params.id
    Department.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
    .then((department)=>{
        res.json(department)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.destroy=(req,res)=>{
    const id = req.params.id
    Department.findByIdAndDelete(id)
    .then((department)=>{
        if(department){
        res.json(department)
        }
        else{
            res.json({})
        }
    })
    .catch((err)=>{
        res.json(err)
    })
}