const express=require('express');
const studentSchema=require('../model/studentSchema');
const studentRoute=express.Router();
const mongoose=require("mongoose");


//login user - Authentication 
//login user - Authentication 
studentRoute.post("/login",async(req,res)=>{
    try{
        const {email,pass}=req.body;
        const student=await studentSchema.findOne({
              email: email
            });
        console.log(pass);
        if(student.length !==null){
            console.log(typeof(student.pass));
            console.log(typeof(pass));
            if(student.pass!= pass){
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
studentRoute.post("/register",async (req,res)=>{
    try{
        const {name,email,RegsNo,pass}=req.body;
        console.log(name);
        await studentSchema.create({name:name,email:email,RegsNo:RegsNo,pass:pass},(err,data)=>{
            console.log(name);
            if(err)
                return err 
            else 
                res.json(data)
        })
    }catch(err){
        console.log(err);
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
    studentSchema.findById(query,(err,data)=>{
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