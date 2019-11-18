const Employee = require('../models/employee')

module.exports.list=(req,res)=>{
    Employee.find().populate('department')
    .then((employees)=>{
        res.json(employees)
    })
    .catch((err)=>{
        res.json(employees)
    })
}

module.exports.create=(req,res)=>{
    const employee= new Employee(req.body)
    employee.save()
    .then((employee)=>{
        res.json(employee)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.show=(req,res)=>{
    Employee.findById(req.params.id).populate('department')
    .then((employee)=>{
        if(employee){
        res.json(employee)
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
    Employee.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    .then((employee)=>{
        if(employee){
            res.json(employee)
        }
        else{
            res.json(employee)
        }
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.destroy=(req,res)=>{
    Employee.findByIdAndDelete(req.params.id)
    .then((employee)=>{
        if(employee){
            res.json(employee)
        }
        else{
            res.json({})
        }
    })
    .catch((err)=>{
        res.json(err)
    })
}