import TaskModel from "../../models/TaskModel";
import {ITask} from "../../utils/interface/Task"
import { Request, Response } from "express";

async function getAllTasks(userId: string): Promise<ITask[]> {
  try {
    const tasks = await TaskModel.find({ userId });
    return tasks;
  } catch (error) {
    throw error;
  }
}

async function searchTasksByText(userId: string, searchText: string): Promise<ITask[]> {
  try {
    const tasks = await TaskModel.find({
      userId,
      $or: [
        { taskName: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } }
      ]
    });
    return tasks;
  } catch (error) {
    throw error;
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


export { getAllTasks, searchTasksByText, getPaginatedTasks };
