import express from "express";
import { getAllAssociate } from "../controllers/getAllUserController.js";

const allUserRoute=express.Router();


allUserRoute.get('/associates',getAllAssociate)

export default allUserRoute;