import { Schema, model } from "mongoose";
import { ITask } from "../utils/interface/Task";
const TaskSchemma = new Schema<ITask>({
  taskName: {
    type: "String",
    required: true,
  },
  description: {
    type: "String",
    required: false,
  },
  createdAt: {
    type: "Number",
    required: true,
    default: new Date().getTime(),
  },
  updatedAt: {
    type: "Number",
    required: true,
    default: new Date().getTime(),
  },
  userId: {
    type: "String",
    required: true,
  },
  status: {
    type: "Boolean",
    required: true,
    default: false,
  },
});
const TaskModel = model<ITask>("Task", TaskSchemma);
export default TaskModel;
