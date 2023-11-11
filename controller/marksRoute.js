const express=require("express");
const marksSchema=require("../model/marksSchema");
const marksRoute=express.Router();
const mongoose=require("mongoose");

//create student marks -create operation
marksRoute.post("/create-marks",(req,res)=>{
    const {name,email,RegsNo}=req.body;
    marksSchema.create(
        {
            "name":name,
            "email":email,
            "RegsNo":RegsNo,
            "marks":null
        },
        (err,data)=>{
            if(err)
                return err 
            else 
                res.json(data)
        }
    )
})

//get student marks -read operation
marksRoute.get("/student-marks/:id",(req,res)=>{
    const query={RegsNo:req.params.id};
    console.log(query);
    marksSchema.findOne(query,(err,data)=>{
        if(err)
            return err;
        else
            res.json(data);  
    })
})

//update student marks -update operation
marksRoute.route("/update-marks/:id")
.get((req,res)=>{
    const query={RegsNo:req.params.id}
    marksSchema.findOne(query,(err,data)=>{
        if(err)
            return err;
        else 
            res.json(data);
    })
})
.put((req,res)=>{
    const query={RegsNo:req.params.id}
    marksSchema.findOneAndUpdate(query, {$set:req.body},
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