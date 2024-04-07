import { Request, Response} from "express";
import TaskModel from "../../models/TaskModel";

export const getAllTasks = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  if (!userId) {
    return res.send({ status: 400, message: "ERROR GET TASK: Missing UserID" });
  }
  try {
    const tasks = await TaskModel.find({ userId })
    res.send({ status: 200, result: tasks });
  } catch (error) {
    res.send({ status: 500, message: "ERROR GET TASK: Internal Server Error" });
  }
}

export const searchTasksByText = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    if (!userId) {
      return res.send({ status: 400, message: "ERROR GET TASK: Missing UserID" });
    }
    const searchText = req.query.text as string;
    const tasks = await TaskModel.find({
      userId,
      $or: [
        { taskName: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } }
      ]
    });
    res.send({ status: 200, result: tasks });
  } catch (error) {
    res.send({ status: 500, message: "ERROR GET TASK: Internal Server Error" });
  }
}

