import express from 'express';
import { authMiddleware, roleCheck } from '../middleware/auth.js';
import { assignTasks, getAllTask, getTask } from '../controllers/taskController.js';

const taskRoute=express.Router();


taskRoute.post('/',authMiddleware,roleCheck(['manager']),assignTasks);
taskRoute.get('/my',authMiddleware,roleCheck(['associate']),getTask)
taskRoute.get('/all', authMiddleware, roleCheck(['manager']), getAllTask);

export default taskRoute; 