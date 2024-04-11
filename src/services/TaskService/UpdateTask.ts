import { Request, Response } from "express";
import TaskModel from "../../models/TaskModel";
import { IUser } from "../../utils/interface/User";
import User from "../../models/UserModel";

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { _id, userId, ...body } = req.body;
    const user: IUser | null = await User.findOne({ userId });
    if (!user) {
      return res.status(404).send("ERROR UPDATE TASK: User not found");
    }
    const updatedTask = await User.findOneAndUpdate(
      { userId, "tasks._id": _id },
      {
        $set: { "tasks.$": { _id, ...body } },
      },
      { new: true }
    );
    //console.log("updateTask", updatedTask);
    if (!updatedTask) {
      return res.status(404).send("ERROR UPDATE TASK: Task not found");
    }
    return res.status(200).json({ updatedTask });
  } catch (error) {
    console.error("ERROR UPDATE TASK:", error);
    return res.status(500).send("ERROR UPDATE TASK: Internal Server Error");
  }
};
