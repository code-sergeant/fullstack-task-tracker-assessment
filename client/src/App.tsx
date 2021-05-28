import React, {useState} from 'react';
import './App.css';
import {TaskItem} from "./types/types";
import {AddTaskButton} from "./components/tasks/AddTaskButton";
import {AddTaskModal} from "./components/tasks/AddTaskModal";
import {TaskList} from "./components/tasks/TaskList";

export default function App() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const addTaskHandler = (taskItem: TaskItem) => {
    setTasks([...tasks, taskItem]);
    setIsTaskModalOpen(false);
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      {!isTaskModalOpen && (
        <AddTaskButton
          addTaskHandler={() => setIsTaskModalOpen(!isTaskModalOpen)}
        />
      )}
      {isTaskModalOpen && (
        <AddTaskModal
          onSubmit={addTaskHandler}
          onCancel={() => setIsTaskModalOpen(false)}
        />
      )}
      <TaskList tasks={tasks} />
    </div>
  );
}
