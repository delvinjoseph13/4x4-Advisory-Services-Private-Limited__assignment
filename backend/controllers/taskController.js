import taskModel from "../models/taskModel.js";
import timesheetModel from "../models/timesheet.js";

export const assignTasks=async(req,res)=>{
    const {associateId, description, estimatedHours, date}=req.body;
    try {
        const task=await taskModel.create({ manager: req.user.id, associate: associateId, description, estimatedHours, date })
        
        res.status(201).json({message:"Task Added",data:task})
    } catch (error) {
        res.status(500).json({message:error.message})
    } 

}

//For associate
export const getTask = async (req, res) => {
  try {

    const submittedTimesheets =await timesheetModel.find({
        associate:req.user._id,
        status:'submitted'
    }).select("task")

    const submittedTaskIds=submittedTimesheets.map(ts=>ts.task.toString())

    const tasks=await taskModel.find({
        associate:req.user._id,
        _id:{
            $nin:submittedTaskIds
        }

    })

    // const tasks = await taskModel.find({ associate: req.user._id });
    if (!tasks.length) return res.status(404).json({ message: "No tasks found" });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//For manager
export const getAllTask = async (req, res) => {
  try {
    const allTasks = await taskModel.find().populate('associate', 'username email');
    if (!allTasks.length) return res.status(404).json({ message: "No tasks found" });
    res.status(200).json({allTasks});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

