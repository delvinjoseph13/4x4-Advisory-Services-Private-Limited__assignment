import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
 role: {
    type: String,
    enum: ['manager', 'associate'], // or your roles
    required: true
  }
})


const userModel=mongoose.model("User",userSchema);


export default userModel;