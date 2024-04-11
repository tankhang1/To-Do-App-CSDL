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
import User from "../../models/UserModel";

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { _id, userId } = req.query;

    // const result = await Task.deleteOne({ _id: id });
    // if (result.deletedCount === 0) {
    //    return res.send({ status: 404, message: "ERROR GET TASK: Task not found" });
    // }
    const user = await User.findOneAndUpdate(
      { userId: userId?.toString() },
      { $pull: { tasks: { _id } } }, // Remove all instances of the task with the specified _id
      { new: true }
    );
    return res.send({ success: true });
  } catch (err) {
    console.error("ERROR DELETE TASK:", err);
    res.send({ status: 500, message: "ERROR GET TASK: Internal Server Error" });
  }
};

export default deleteTask;
