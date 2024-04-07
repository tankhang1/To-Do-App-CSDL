import express from "express";
import { deleteTask } from "../services/TaskService/DeleteTask";
import {
  getAllTasks,
  searchTasksByText,
} from "../services/TaskService/GetTask";

const router = express.Router();

router.get("/tasks", getAllTasks);

router.get("/tasks/search", searchTasksByText);

router.delete("/deleteToDo", deleteTask);

export default router;
