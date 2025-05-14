import mongoose from "mongoose";

const noteSchema= new mongoose.Schema({
    title:{
        required:true,
        type:String,
        trim:true
    },
    content:{
        required:true,
        type:String
    },
    tags:[String]
},{timestamps:true})

export default mongoose.models.Notes || mongoose.model("Notes",noteSchema)