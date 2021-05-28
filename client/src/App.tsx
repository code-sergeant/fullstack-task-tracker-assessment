import React, {useEffect, useState} from 'react';
import './App.css';
import {TaskItem} from "./types/types";
import {AddTaskButton} from "./components/tasks/AddTaskButton";
import {AddTaskModal} from "./components/tasks/AddTaskModal";
import {TaskList} from "./components/tasks/TaskList";
import {TasksApiContextProvider} from "./contexts/tasksContext";

export default function App() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  return (
    <div className="App">
    <TasksApiContextProvider>
      <h1>Task Tracker</h1>
      {!isTaskModalOpen && (
        <AddTaskButton
          addTaskHandler={() => setIsTaskModalOpen(!isTaskModalOpen)}
        />
      )}
      {isTaskModalOpen && (
        <AddTaskModal
          onSubmit={() => setIsTaskModalOpen(false)}
          onCancel={() => setIsTaskModalOpen(false)}
        />
      )}
      <TaskList/>
    </TasksApiContextProvider>
    </div>
  );
}
