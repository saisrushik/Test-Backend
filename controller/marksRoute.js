const express=require("express");
const marksSchema=require("../model/marksSchema");
const marksRoute=express.Router();
const mongoose=require("mongoose");

//create student marks
marksRoute.post("/create-marks",(req,res)=>{
    marksSchema.create(req.body,(err,data)=>{
        if(err)
            return err 
        else 
            res.json(data)
    })
})

//get student marks
marksRoute.get("/student-marks",(req,res)=>{
    marksSchema.find((err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})

//update student marks
marksRoute.route("/update-marks/:id")
.get((req,res)=>{
    marksSchema.find(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err)
            return err;
        else 
            res.json(data);
    })
})
.put((req,res)=>{
    marksSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
    {$set:req.body},
    (err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
})


/* 
    delete marks operation is not required, 
    as we do not prefer to delete marks
*/


module.exports=marksRoute;