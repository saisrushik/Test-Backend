const express=require('express');
const studentSchema=require('../model/studentSchema');
const studentRoute=express.Router();
const mongoose=require("mongoose");


//login user - Authentication 
studentRoute.post("/login",async (req,res)=>{
    try{
        const {email,pass}=req.body;
        const student=studentSchema.findOne({email});

        if(student!==null){
            if(student.pass!==pass){
                res.send("Incorrect Password");
            }else{
                res.send("Student Logged In");
            }
        }else{
            res.send("Student Not Found");
        }
    }catch (err){
        res.json(err)
    }
})


//register user -create operation
studentRoute.post("/register",async(req,res)=>{
    try{
        const {name,email,RegsNo,pass}=req.body;

        const student=studentSchema.findOne({RegsNo});
        if(student!==null){
            res.send("Student Already Exist");
        }else{
            studentSchema.create(req.body,(err,data)=>{
                if(err)
                    return err 
                else 
                    res.json(data)
            })
        }
    }catch(err){
        res.json(err);
    }
})


//get student -read operation
studentRoute.get("/student/:id",(req,res)=>{
    const query={RegsNo:req.params.id}
    studentSchema.find(query,(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})

//update student -update operation
studentRoute.route("/update-student/:id")
.get((req,res)=>{
    const query={RegsNo:req.params.id}
    studentSchema.find(query,(err,data)=>{
        if(err)
            return err
        else    
            return res.json(data)
    })
})
.put((req,res)=>{
    studentSchema.findOneAndUpdate(express.query, {$set:req.body},
        (err,data)=>{
            if(err)
                return err
            else 
                res.json(data);
        }
    )
})

//delete student -delete operation
studentRoute.delete("/delete-student/:id",(req,res)=>{
    const query={RegsNo:req.params.id}
    studentSchema.findOneAndRemove(query,
    (err,data)=>{
        if(err)
            return err;
        else 
            res.json(data);
    })
})




module.exports=studentRoute;