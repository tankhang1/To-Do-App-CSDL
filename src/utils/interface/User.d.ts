import { ITask } from "./Task";

declare interface IUser {
  userId: string;
  tasks?: ITask[];
}
