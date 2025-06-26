import express from "express"
import { createTimeSheet, forManager, timesheetAssociate } from "../controllers/timeSheetController.js"
import { authMiddleware, roleCheck } from "../middleware/auth.js"

const timesheetRoute=express.Router()



timesheetRoute.post('/',authMiddleware,roleCheck(['associate']),createTimeSheet)
timesheetRoute.get('/my',authMiddleware,roleCheck(['associate']),timesheetAssociate)
timesheetRoute.get('/all',authMiddleware,roleCheck(['manager']),forManager)

export default timesheetRoute; 