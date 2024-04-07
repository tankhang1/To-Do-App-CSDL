import express, { Request, Response } from "express";
import { getAllTasks, searchTasksByText } from "../services/TaskService/GetTask";

const router = express.Router();

router.get("/tasks", getAllTasks);

router.get("/tasks/search", searchTasksByText);

export default router;
