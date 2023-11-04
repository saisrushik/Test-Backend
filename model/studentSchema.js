const mongoose=require("mongoose");

const studentSchema= new mongoose.Schema(
    {
        "name":{Type:String},
        "email":{Type:String},
        "RegsNo":{Type:String},
        "pass":{Type:String},
    },
    {
        collection:"Users"
    }
);

module.exports=mongoose.model("studentSchema",studentSchema);