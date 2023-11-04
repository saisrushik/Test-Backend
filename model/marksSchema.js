const mongoose=require("mongoose");

const marksSchema= new mongoose.Schema(
    {
        "name":{Type:String},
        "email":{Type:String},
        "RegsNo":{Type:String},
        "marks":{Type:Number},
    },
    {
        collection:"students"
    }
);

module.exports=mongoose.model("marksSchema",marksSchema);