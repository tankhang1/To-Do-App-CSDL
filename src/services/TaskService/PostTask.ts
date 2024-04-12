import { Request, Response } from "express";
import { IUser } from "../../utils/interface/User";
import User from "../../models/UserModel";
import { UUID } from "mongodb";
import { randomUUID } from "crypto";

export const addTask = async (req: Request, res: Response) => {
  try {
    const { taskName, description, priority, userId, status } = req.body;
    console.log(req.body);
    if (!taskName || !description || !userId) {
      return res.status(400).send("ERROR ADD TASK: Missing required fields");
    }
    const user: IUser | null = await User.findOne({ userId });
    if (!user) {
      const newTask = await User.create({
        userId,
        tasks: [
          {
            ...req.body,
            _id: randomUUID(),
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
          },
        ],
      });
      return res.status(200).json({ task: newTask?.tasks });
    }
    const updatedTasks = user.tasks ? [...user.tasks] : [];
    const updateUser = await User.findOneAndUpdate(
      { userId },
      {
        tasks: [
          {
            ...req.body,
            _id: randomUUID(),
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
          },
          ...updatedTasks,
        ],
      },
      { new: true }
    );
    if (updateUser?.tasks) {
      return res.status(200).json({ task: updateUser?.tasks[0] });
    }
    return res.status(400).send("Cannot add new task");
  } catch (err) {
    console.error("ERROR ADD TASK:", err);
    return res.status(500).send("ERROR ADD TASK: Internal Server Error");
  }
};
