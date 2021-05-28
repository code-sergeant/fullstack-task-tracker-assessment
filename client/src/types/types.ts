export type TaskItem = {
  id?: number;
  title: string;
  date: Date;
}

export interface TasksApiResponse {
  _embedded: {
    tasks: TaskItem[]
  }
}