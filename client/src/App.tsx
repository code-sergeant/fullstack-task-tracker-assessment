import React, {useState} from 'react';
import {AddTaskButton} from "./components/tasks/AddTaskButton";
import {AddTaskModal} from "./components/tasks/AddTaskModal";
import {TaskList} from "./components/tasks/TaskList";
import {TasksApiContextProvider} from "./contexts/tasksContext";
import {AppBar, Container, Grid, Toolbar, Typography} from "@material-ui/core";
import {TaskTrackerAppBar} from "./components/TaskTrackerAppBar";


export default function App() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  return (
    <div className="App">
      <TasksApiContextProvider>
        <TaskTrackerAppBar isTaskModalOpen={isTaskModalOpen} setIsTaskModalOpen={setIsTaskModalOpen}/>
        <Container>
          <TaskList/>
        </Container>
        {isTaskModalOpen && (
          <AddTaskModal
            onSubmit={() => setIsTaskModalOpen(false)}
            onCancel={() => setIsTaskModalOpen(false)}
          />
        )}
      </TasksApiContextProvider>
    </div>
  );
}
