import TaskModel from "../../models/TaskModel";
import {ITask} from "../../utils/interface/Task"

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

export { getAllTasks, searchTasksByText };
