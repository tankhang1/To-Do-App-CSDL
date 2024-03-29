import { Schema, model } from "mongoose";
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
const Task = model("Task", TaskSchemma);
export default Task;
