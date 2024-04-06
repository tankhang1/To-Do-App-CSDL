export interface ITask {
  taskName: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
  status: boolean;
  userId: string;
}
