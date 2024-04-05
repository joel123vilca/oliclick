export interface Task {
  id: string;
  state: TaskStatus;
  text: string;
  createdAt: string;
}

export enum TaskStatus {
  Pending = "pending",
  Completed = "completed",
  All = "all",
}
