import TaskModel from "../../models/TaskModel";
import { Request, Response } from "express";

export const getAllTasks = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  if (!userId) {
    return res.send({ status: 400, message: "ERROR GET TASK: Missing UserID" });
  }
  try {
    const tasks = await TaskModel.find({ userId })
    res.send({ status: 200, message: tasks });
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
    res.send({ status: 200, message: tasks });
  } catch (error) {
    res.send({ status: 500, message: "ERROR GET TASK: Internal Server Error" });
  }
}

const getPaginatedTasks = async (req: Request, res: Response) => {
  let { page = 1, limit = 3 } = req.query;
  
  page = parseInt(page as string);
  limit = parseInt(limit as string);

  try {
    const skip = (page - 1) * limit;

    const tasks = await TaskModel.find().limit(limit).skip(skip).exec();

    const totalCount = await TaskModel.countDocuments();

    return res.status(200).json({
      data: tasks,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    });
  } catch (error) {
    console.error("ERROR GET PAGINATED TASKS:", error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};


export { getPaginatedTasks };
