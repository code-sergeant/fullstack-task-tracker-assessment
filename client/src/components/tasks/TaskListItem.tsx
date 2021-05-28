import React from "react";
import {TaskItem} from "../../types/types";
import {deleteTask} from "../../api/deleteTask";

type Props = {
  task: TaskItem
};

export const TaskListItem: React.FC<Props> = ({task}) => {
  const {id, title, date} = task
  const deleteHandler = () => deleteTask(id)

  return (
    <li style={{listStyleType: "none"}}>
      <strong>{title}</strong>
      <p>{new Date(date).toDateString()}</p>
      <button onClick={deleteHandler}>Delete</button>
    </li>
  );
};
