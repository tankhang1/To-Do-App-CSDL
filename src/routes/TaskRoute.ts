import express, { Request, Response } from 'express';
import { deleteTask } from '../services/TaskService/DeleteTask';

const router = express.Router();

router.delete("/deleteToDo", deleteTask);

export default router;
