import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


export const authMiddlewar=(req,res,next)=>{
    const token=req.header['Authorization'].split(' ')[1]
    if(!token){
        return res.status(401).json({message:"No Token Provided , access denied"})
    }

    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decode
        next()

    } catch (error) {
        
        res.status(401).json({message:"Invalid Token"})
    }

}

export const roleCheck = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ msg: 'Access forbidden' });
  }
  next();
};


