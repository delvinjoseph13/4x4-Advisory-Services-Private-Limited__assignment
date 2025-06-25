import userModule from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const userRegister=async(req,res)=>{
    const {username,email,password}=req.body
    try {
        const user=await userModule.findOne({email});

        if(user){
            return res.status(404).json({message:"User Already exits"})
        }


        const newUser=await userModule.create({
            username,
            email,
            password:bcrypt.hashSync(password,10)
        })

        res.status(201).json({message : "User Registed",user:newUser})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const userLogin=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await userModule.findOne({email});

        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }

        let validPassword=bcrypt.compareSync(password,user.password);

        if(!validPassword){
            return res.status(400).json({message:"Password Is Not Matching"})
        }

        const token=jwt.sign({ id: user._id, role: user.role },"secret_key",{expiresIn:'1h'})

        res.status(200).json({
      message: "Successfully Logged In",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

    } catch (error) {

        res.status(500).json({message:error.message})
        
    }
}

