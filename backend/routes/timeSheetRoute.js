import express from "express"
import { createTimeSheet, forManager, timesheetAssociate } from "../controllers/timeSheetController.js"
import { roleCheck } from "../middleware/auth.js"

const timesheetRoute=express.Router()



timesheetRoute.post('/',roleCheck(['associate']),createTimeSheet)
timesheetRoute.get('/my',roleCheck(['associate']),timesheetAssociate)
timesheetRoute.get('/all',roleCheck(['manager']),forManager)

export default timesheetRoute; 