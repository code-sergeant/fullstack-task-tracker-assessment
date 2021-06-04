export type TaskItem = {
  id?: number;
  title: string;
  date: string;
}

export interface TasksApiResponse {
  _embedded: {
    tasks: TaskItem[]
  }
}