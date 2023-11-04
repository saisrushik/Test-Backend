const express=require("express");
const mongoose=require('mongoose');
const bodyParser=require("body-parser");
const cors=require('cors');
const studentRoute=require("./controller/studentRoute");
const marksRoute=require("./controller/marksRoute");

const app=express();


mongoose.set("strictQuery",true);
mongoose.connect("mongodb+srv://language:12345@cluster0.mueskkm.mongodb.net/LinguaDatabase");
var db=mongoose.connection;
db.on("open",()=>console.log("connected to database"));
db.on("error",()=>console.log("Error Occured"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use("/studentRoute",studentRoute)
app.use("/marksRoute",marksRoute)

app.listen(4000,()=>{
    console.log("server started at http://localhost:4000");
})