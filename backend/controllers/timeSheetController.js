import timesheetModel from "../models/timesheet.js";


//Submit hours (associate)
export const createTimeSheet=async(req,res)=>{
    const { taskId, actualHours } = req.body; 
    try {
        const ts=await timesheetModel.create({
             associate: req.user.id, task: taskId, actualHours,status: "submitted"
        })

        res.status(201).json({message:"Submited Hours",ts})
    } catch (error) {
        
    }
} 


//For associate
export const timesheetAssociate=async(req,res)=>{
    try {
        const ts=await timesheetModel.find({
            associate:req.user.id,
        }).populate('task')
        res.status(200).json({message:"Timesheet Associate",ts})
    } catch (error) {
        res.status(404).json({message:"Not Found",error})
        
    }
}


export const forManager = async (req, res) => {
  try {
    const timesheets = await timesheetModel
      .find()
      .populate("task")
      .populate("associate", "username email");
    res.status(200).json({ message: "All Timesheets", timesheets });
  } catch (error) {
    res.status(500).json({ message: "Error fetching timesheets", error });
  }
}