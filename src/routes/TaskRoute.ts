import express, { Request, Response } from "express";
import { deleteTask } from "../services/TaskService/DeleteTask";
import {
  getAllTasks,
  searchTasksByText,
  getPaginatedTasks
} from "../services/TaskService/GetTask";
import { addTask } from "../services/TaskService/PostTask";
import { updateTask } from "../services/TaskService/UpdateTask";

const router = express.Router();

router.delete("/deleteToDo", deleteTask);
router.post("/addTask", addTask);
router.put("/updateTask", updateTask);
router.get("/", async (req: Request, res: Response) => {
  res.send("Hello");
});

router.get("/tasks", getAllTasks);

router.get("/tasks/search", searchTasksByText);

router.get('/getTodo/pagination', getPaginatedTasks);

export default router;
