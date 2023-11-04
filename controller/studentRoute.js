const express=require('express');
const studentSchema=require('../model/studentSchema');
const studentRoute=express.Router();
const mongoose=require("mongoose");


//create student
studentRoute.post("/create-student",(req,res)=>{
    studentSchema.create(req.body,(err,data)=>{
        if(err)
            return err 
        else 
            res.json(data)
    })
})

//get student
studentRoute.get("/",(req,res)=>{
    studentSchema.find((err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})

//update student
studentRoute.route("/update-student/:id")
.get((req,res)=>{
    studentSchema.find(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err)
            return err
        else    
            return res.json(data)
    })
})
.put((req,res)=>{
    studentSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id)),
    {$set:req.body},
    (err,data)=>{
        if(err)
            return err
        else 
            res.json(data);
    }
})

//delete student
studentRoute.delete("/delete-student/:id",(req,res)=>{
    studentSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),
    (err,data)=>{
        if(err)
            return err;
        else 
            res.json(data);
    })
})

module.exports=studentRoute;