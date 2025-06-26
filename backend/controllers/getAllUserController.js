import userModel from "../models/userModel.js";

export const getAllAssociate=async(req,res)=>{
    try {
        const associates =await userModel.find({role:'associate'}).select('_id username email');
        res.status(200).json({message:"Associates Fetched",associates})
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}