export type TaskItem = {
  title: string;
  date: Date;
}

export type ServerTaskItem = TaskItem & {id: number}

export interface TasksApiResponse {
  _embedded: {
    tasks: ServerTaskItem[]
  }
}