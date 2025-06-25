import mongoose from "mongoose";


const taskSchema=mongoose.Schema({
    manager:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    },
    associate:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    },
    description : {
        type:String
    },
    estimatedHours:{
        type:Number
    }, 
    Date:{
        type:Date
    }
})

const taskModel=mongoose.model('Task',taskSchema)

export default taskModel;