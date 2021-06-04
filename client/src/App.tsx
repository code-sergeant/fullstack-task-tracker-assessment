import React, {useCallback, useEffect, useState} from 'react';
import {AddTaskModal} from "./components/tasks/AddTaskModal";
import {TaskList} from "./components/tasks/TaskList";
import {Container} from "@material-ui/core";
import {TaskTrackerAppBar} from "./components/TaskTrackerAppBar";
import {getAllTasksApi} from "./api/getAllTasksApi";
import {CreateTaskInput, TaskItem} from "./types/types";
import {createTaskApi} from "./api/createTaskApi";
import {deleteTaskApi} from "./api/deleteTaskApi";


export default function App() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskItem[]>([])

  const getAllTasksHandler = useCallback(getAllTasksApi, [])

  const createTaskHandler = ({title}: CreateTaskInput) =>
    createTaskApi({title})
      .then((taskItem) => setTasks([...tasks, taskItem]))

  const deleteTaskHandler = (taskId: number) => deleteTaskApi(taskId)
    .then(() => setTasks(tasks.filter(task => task.id !== taskId)))

  useEffect(() => {
      getAllTasksHandler()
        .then(tasks => setTasks(tasks))
  }, [getAllTasksHandler])

  return (
    <>
      <TaskTrackerAppBar
        isTaskModalOpen={isTaskModalOpen}
        setIsTaskModalOpen={setIsTaskModalOpen}
      />
      <Container>
        <TaskList
          tasks={tasks}
          deleteTask={deleteTaskHandler}
        />
      </Container>
      <AddTaskModal
        open={isTaskModalOpen}
        toggleOpen={() => setIsTaskModalOpen(!isTaskModalOpen)}
        createTask={createTaskHandler}
      />
    </>
  );
}
