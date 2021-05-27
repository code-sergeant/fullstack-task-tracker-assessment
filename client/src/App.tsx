import React from 'react';
import './App.css';
import useAxios from "./hooks/useAxios";
import {TasksApiResponse} from "./types/types";

export default function App() {
  const {data} = useAxios<TasksApiResponse>("/api/tasks")

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      {
        data?._embedded.tasks.map((task) =>
          <p key={task.id}>{task.title}: {new Date(task.date).toLocaleDateString()}</p>)
      }
    </div>
  );
}
