import express, { Request, Response } from "express";
import { deleteTask } from "../services/TaskService/DeleteTask";
import {
  getAllTasks,
  searchTasksByText,
} from "../services/TaskService/GetTask";

const router = express.Router();

router.delete("/deleteToDo", deleteTask);

router.get("/", async (req: Request, res: Response) => {
  res.send("Hello");
});
router.get("/tasks", async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  try {
    const tasks = await getAllTasks(userId);
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tasks/search", async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  const searchText = req.query.text as string;
  try {
    const tasks = await searchTasksByText(userId, searchText);
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
