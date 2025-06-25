import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:['associate','manager'],
        default:'associate'
    } 
})


const userModule=mongoose.model("User",userSchema);


export default userModule;