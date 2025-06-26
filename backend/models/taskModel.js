import mongoose from "mongoose";


const taskSchema=mongoose.Schema({
    manager:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    },
      associate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
    description : {
        type:String
    },
    estimatedHours:{
        type:Number
    }, 
    date:{
        type:Date
    }
})

const taskModel=mongoose.model('Task',taskSchema)

export default taskModel;