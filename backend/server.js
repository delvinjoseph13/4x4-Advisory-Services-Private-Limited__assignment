import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import taskRoute from "./routes/taskRoute.js";
import timesheetRoute from "./routes/timeSheetRoute.js";
import cors from "cors"
import dotenv from 'dotenv'
import allUserRoute from "./routes/allUserRoute.js";

dotenv.config()

const app=express()
app.use(express.json());
app.use(cors())

app.use('/api/auth',userRoute)
app.use('/api/tasks',taskRoute)
app.use('/api/timesheet',timesheetRoute)
app.use('/api/all',allUserRoute)


    mongoose.connect(process.env.MOGODB_URL)
    const db=mongoose.connection
    db.on("open",()=>{
        console.log("connected successfully")
    })


app.listen(5000,()=>{
    console.log("server is running on port 5000")
})


