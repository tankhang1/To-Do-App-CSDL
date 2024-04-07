// import Task from '../../models/TaskModel';

// export const deleteTask = async (taskId: string) => {
//   try {
//     const result = await Task.deleteOne({ _id: taskId });
//     return { success: true, deletedCount: result.deletedCount };
//   } catch (error) {
//     console.error(error);
//     throw new Error('Internal Server Error');
//   }
// };

import Task from "../../models/TaskModel";
import { Request, Response } from "express";

export const deleteTask = async (req: Request, res: Response) => {
   try {
      const { id } = req.query;
      if (!id) {
         return res.send({ status: 400, message: "ERROR DELETE TASK: Missing task ID" });
      } 
      const result = await Task.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
         return res.send({ status: 404, message: "ERROR DELETE TASK: Task not found" });
      }
      res.send({ success: true, deletedCount: result.deletedCount });
   } catch(err) {
      console.error("ERROR DELETE TASK:", err);
      res.send({ status: 500, message: "ERROR DELETE TASK: Internal Server Error" });
   }
}

export default deleteTask;

