import express from 'express';
import { roleCheck } from '../middleware/auth.js';
import { assignTasks, getAllTask, getTask } from '../controllers/taskController.js';

const taskRoute=express.Router();


taskRoute.post('/',roleCheck(['manager']),assignTasks);
taskRoute.get('/my',roleCheck(['associate']),getTask)
taskRoute.get('/all',roleCheck(['manager']),getAllTask)


export default taskRoute; 