import express from "express";
import connectDB from "./utils/db.js";
import Notes from './models/notes.models.js'
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()

const app=express()
app.use(express.json())
app.use(cors())

connectDB()

app.get('/',(req,res)=>{
    res.send(`server is running`)
})

app.post('/notes',async (req,res)=>{
    const {title,content,tags}=req.body;
    if (!title||!content){
        res.status(400).json({error:"title and content are required"})
    }
    try{
        const newNotes= new Notes({
            title,
            content,
            tags:tags||[]
        })
        const savedNotes=await  newNotes.save()
        res.status(200).json(savedNotes.data)
    }catch(err){
        console.log(err.message)
    }
});

app.get("/notes", async (req, res) => {
    try {
      const notes = await Notes.find();
      res.status(200).json(notes);
    } catch (err) {
      res.status(500).json({ error: "Error fetching notes", details: err.message });
    }
  });

app.delete("/notes/:id",async(req,res)=>{
    const {id}= req.params;
    try{
        const deleteNode=await Notes.findByIdAndDelete(id);
        if (!deleteNode){
            return res.status(404).json({error:"Not found"})
        }
        res.status(200).json({message:"Node deleted"})
    }catch(err){
        res.status(500).json({error:"Error while deleting node",details:err.message})
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${process.env.PORT}`)
})