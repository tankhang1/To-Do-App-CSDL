import express, {Express, Request, Response} from "express";
import TaskModel from "../../models/TaskModel";

export const addTask = async (req: Request, res: Response) => {
   try {
      const {taskName, description, createdAt, updatedAt, userId, status} = req.query;
      if(!taskName || !description || !createdAt || !updatedAt || !userId ||!status) {
         return res.status(400).send("ERROR ADD TASK: Missing required fields");
      } 
      const newTask = await TaskModel.create(req.query);
      return res.status(200).json({task: newTask});
   } catch(err) {
      console.error("ERROR ADD TASK:", err);
      return res.status(500).send("ERROR ADD TASK: Internal Server Error");
   }
}