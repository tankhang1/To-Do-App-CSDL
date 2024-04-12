export interface ITask {
  _id: string;
  taskName: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
  status: boolean;
  userId: string;
  priority: string;
}
