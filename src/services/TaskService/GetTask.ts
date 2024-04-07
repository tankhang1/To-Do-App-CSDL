import { Request, Response} from "express";
import TaskModel from "../../models/TaskModel";

export const getAllTasks = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  try {
    const tasks = await TaskModel.find({ userId })
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
}

export const searchTasksByText = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    const searchText = req.query.text as string;
    const tasks = await TaskModel.find({
      userId,
      $or: [
        { taskName: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } }
      ]
    });
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
}

