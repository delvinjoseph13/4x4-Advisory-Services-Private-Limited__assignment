import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";

const app=express()
app.use(express.json());

app.use('/auth',userRoute)

mongoose.connect('')

app.listen(5000,()=>{
    console.log("server is running on port 5000")
})


