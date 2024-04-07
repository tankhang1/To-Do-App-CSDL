import express, { Express, Request, Response, Router } from "express";
import { addTask } from "../services/TaskService/PostTask";
import { updateTask } from "../services/TaskService/UpdateTask";

const router: Router = express.Router();

router.post("/add", addTask);
router.post("/update", updateTask);

export default router;

