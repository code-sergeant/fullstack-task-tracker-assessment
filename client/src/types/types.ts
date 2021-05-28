export type TaskItem = {
  id: number;
  title: string;
  date: Date;
}

export interface GetAllTasksApiResponse {
  _embedded: {
    tasks: TaskItem[]
  }
}

export type CreateTaskInput = {
  title: string;
}

export type CreateTaskApiResponse = TaskItem
