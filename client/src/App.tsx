import React from 'react';
import './App.css';
import useAxios from "./hooks/useAxios";
import {TasksApiResponse} from "./types/types";

export default function App() {
  const {data} = useAxios<TasksApiResponse>("/api/tasks")
  console.log(data)

  return (
    <div className="App">
      <h1>Task Tracker</h1>
    </div>
  );
}
