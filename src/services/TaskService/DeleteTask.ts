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
import { IUser } from "../../utils/interface/User";

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { _id, userId } = req.query;

    // const result = await Task.deleteOne({ _id: id });
    // if (result.deletedCount === 0) {
    //    return res.send({ status: 404, message: "ERROR GET TASK: Task not found" });
    // }
    console.log("new tasks ", _id);
    const user: IUser | null = await User.findOne({
      userId: userId?.toString(),
    });
    if (user) {
      const newTasks = user.tasks?.filter((task) => task._id !== _id);
      console.log("new tasks ", newTasks);
      await User.findOneAndUpdate(
        { userId: userId?.toString() },
        { tasks: newTasks }, // Remove all instances of the task with the specified _id
        { new: true }
      );
      return res.send({ success: true });
    }

    return res.send({
      status: 500,
      message: "ERROR DELETE TASK: User id not found",
    });
  } catch (err) {
    console.error("ERROR DELETE TASK:", err);
    res.send({ status: 500, message: "ERROR GET TASK: Internal Server Error" });
  }
};

export default deleteTask;
