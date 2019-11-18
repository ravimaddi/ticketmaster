const Ticket= require('../models/ticket')

module.exports.list=(req,res)=>{
    Ticket.find()
    .then((tickets)=>{
        res.json(tickets)
    })
    .catch((err)=>{
        res.json(tickets)
    })
}

module.exports.create=(req,res)=>{
    const ticket = new Ticket(req.body)
    ticket.save()
    .then((ticket)=>{
        res.json(ticket)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.show=(req,res)=>{
    Ticket.findById(req.params.id).populate('employees').populate('customer').populate('department')
    .then((ticket)=>{
        if(ticket){
            res.json(ticket)
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
    Ticket.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    .then((ticket)=>{
        if(ticket){
            res.json(ticket)
        }
        else{
            res.json({})
        }
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.destroy=(req,res)=>{
    Ticket.findByIdAndDelete(req.params.id)
    .then((ticket)=>{
        if(ticket){
            res.json(ticket)
        }
        else{
            res.json({})
        }
    })
    .catch((err)=>{
        res.json(err)
    })
}