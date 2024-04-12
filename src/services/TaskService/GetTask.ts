import TaskModel from "../../models/TaskModel";
import { Request, Response } from "express";
import User from "../../models/UserModel";
import { IUser } from "../../utils/interface/User";
import { ITask } from "../../utils/interface/Task";

export const getAllTasks = async (req: Request, res: Response) => {
  let { userId, limit = 8, page = 1 } = req.query;
  page = parseInt(page as string);
  limit = parseInt(limit as string);
  if (!userId) {
    return res.send({ status: 400, message: "ERROR GET TASK: Missing UserID" });
  }
  try {
    const skip = (page - 1) * limit;

    const user: IUser | null = await User.findOne({
      userId: userId.toString(),
    })
      .limit(limit)
      .skip(skip)
      .exec();
    return res.status(200).json({
      data: user?.tasks,
      currentPage: page,
      totalPages: Math.ceil(user?.tasks?.length ?? 0 / limit),
      totalCount: user?.tasks?.length,
    });
  } catch (error) {
    res.send({ status: 500, message: "ERROR GET TASK: Internal Server Error" });
  }
};

export const searchTasksByText = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    if (!userId) {
      return res.send({
        status: 400,
        message: "ERROR GET TASK: Missing UserID",
      });
    }
    const searchText = req.query.text as string;
    const user: IUser | null = await User.findOne({
      userId: userId.toString(),
    });
    const tasks = user?.tasks?.filter(
      (task) =>
        task.description?.toLowerCase().includes(searchText.toLowerCase()) ||
        task.taskName.toLowerCase().includes(searchText.toLowerCase())
    );

    res.send({ status: 200, message: tasks });
  } catch (error) {
    res.send({ status: 500, message: "ERROR GET TASK: Internal Server Error" });
  }
};

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
