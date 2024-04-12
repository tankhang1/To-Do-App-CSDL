import { Request, Response } from "express";
import TaskModel from "../../models/TaskModel";
import { IUser } from "../../utils/interface/User";
import User from "../../models/UserModel";

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { _id, userId, ...body } = req.body;
    console.log("update", req.body);
    const user: IUser | null = await User.findOne({ userId });
    if (!user) {
      return res.status(404).send("ERROR UPDATE TASK: User not found");
    }
    const tasks = user.tasks;
    const newTasks = tasks?.map((task) => {
      if (task._id === _id)
        return {
          ...req.body,
        };
      return task;
    });
    console.log("new", newTasks);
    await User.findOneAndUpdate({ userId }, { tasks: newTasks }, { new: true });
    //console.log("updateTask", updatedTask);

    return res.status(200);
  } catch (error) {
    console.error("ERROR UPDATE TASK:", error);
    return res.status(500).send("ERROR UPDATE TASK: Internal Server Error");
  }
};
