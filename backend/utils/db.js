import mongoose from "mongoose";

export default async function connectDB(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB successfully connected"))
    .catch((err)=>console.log(`Error: ${err}`))
}