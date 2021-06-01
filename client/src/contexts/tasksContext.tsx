import React, {useState, createContext, useEffect} from 'react'
import {CreateTaskInput, TaskItem} from "../types/types";
import {createTaskApi} from "../api/createTaskApi";
import {getAllTasksApi} from "../api/getAllTasksApi";
import {deleteTaskApi} from "../api/deleteTaskApi";

export type TasksContextValueType = {
  tasks: TaskItem[];
  createTask: (createTaskInput: CreateTaskInput) => Promise<void>
  getAllTasks: () => Promise<void>
  deleteTask: (taskId: number) => Promise<void>
}
export const TasksContext = createContext<TasksContextValueType>({
  tasks: [],
  createTask: async () => void (0),
  getAllTasks: async () => void (0),
  deleteTask: async () => void (0),
})

type Props = {
  overrides?: Partial<TasksContextValueType>
}
export const TasksApiContextProvider: React.FC<Props> = ({overrides, children}) => {
  const [tasks, setTasks] = useState<TaskItem[]>(overrides?.tasks || [])

  const getAllTasks = () => getAllTasksApi()
    .then(res => setTasks(res.data._embedded.tasks))
    .catch(console.error)

  const createTask = (createTaskInput: CreateTaskInput) => createTaskApi(createTaskInput)
    .then((res) => {
      setTasks([...tasks, res.data])
    })

  const deleteTask = (taskId: number) => deleteTaskApi(taskId)
    .then(() => {
      const tasksMinusDeletedTask = tasks.filter(task => task.id !== taskId)
      setTasks(tasksMinusDeletedTask)
    })

  useEffect(() => {
    getAllTasks().then()
  }, [])

  return (<TasksContext.Provider value={{
    tasks: overrides?.tasks || tasks,
    createTask,
    getAllTasks: overrides?.getAllTasks || getAllTasks,
    deleteTask: overrides?.deleteTask || deleteTask,
  }}>
    {children}
  </TasksContext.Provider>)
}