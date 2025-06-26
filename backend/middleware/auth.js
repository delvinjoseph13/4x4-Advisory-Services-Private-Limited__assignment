import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";

dotenv.config();

export const authMiddleware = async (req, res, next) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log("Token from header:", token);

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "No Token Provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    const user = await userModel.findById(decoded.id);
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    console.log("User attached to req.user:", req.user);
    next();
  } catch (error) {
    console.log("Token error:", error.name, error.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export const roleCheck = (roles) => (req, res, next) => {
  console.log("Running roleCheck", { expectedRoles: roles });

  if (!req.user) {
    console.log("req.user missing in roleCheck");
    return res.status(403).json({ msg: "User not authenticated" });
  }

  if (!roles.includes(req.user.role)) {
    console.log("Access forbidden for role:", req.user.role);
    return res.status(403).json({ msg: "Access forbidden" });
  }

  console.log("roleCheck passed");
  next();
};



