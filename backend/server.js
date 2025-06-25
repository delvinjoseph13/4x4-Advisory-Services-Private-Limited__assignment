import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import taskRoute from "./routes/taskRoute.js";
import timesheetRoute from "./routes/timeSheetRoute.js";
import cors from "cors"

const app=express()
app.use(express.json());
app.use(cors())

app.use('/auth',userRoute)
app.use('/api/task',taskRoute)
app.use('/api/timesheet',timesheetRoute)

mongoose.connect('')

app.listen(5000,()=>{
    console.log("server is running on port 5000")
})


