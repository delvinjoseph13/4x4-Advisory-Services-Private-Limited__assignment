import mongoose from "mongoose";


const timesheetSchema=mongoose.Schema({
    associate:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    },
    task:{
        type:mongoose.Schema.Types.ObjectId,ref:'Task'
    },
    actualHours:{
        type:Number
    },
    status:{
        type:String,
        enum:['draft','submitted'],
        required:true 
    }
})

const timesheetModel=mongoose.model('Timesheet',timesheetSchema)

export default timesheetModel;