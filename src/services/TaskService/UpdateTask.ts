import { Request, Response } from "express";
import TaskModel from "../../models/TaskModel";

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id, taskName, description, createdAt, updatedAt, userId, status } = req.query;
    if(!taskName || !description || !createdAt || !updatedAt || !userId ||!status) {
      return res.status(400).send("ERROR ADD TASK: Missing required fields");
   } 

    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      {
        taskName,
        description,
        createdAt,
        updatedAt,
        userId,
        status,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).send("ERROR UPDATE TASK: Task not found");
    }

    res.status(200).json({ updatedTask });
  } catch (error) {
    console.error("ERROR UPDATE TASK:", error);
    res.status(500).send("ERROR UPDATE TASK: Internal Server Error");
  }
};