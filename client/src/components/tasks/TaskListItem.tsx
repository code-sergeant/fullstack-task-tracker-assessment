import React, {useContext} from "react";
import {TaskItem} from "../../types/types";
import {TasksContext} from "../../contexts/tasksContext";

type Props = {
  task: TaskItem
};

export const TaskListItem: React.FC<Props> = ({task}) => {
  const {deleteTask} = useContext(TasksContext)

  return (
    <li style={{listStyleType: "none"}}>
      <strong>{task.title}</strong>
      <p>{new Date(task.date).toDateString()}</p>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
};
