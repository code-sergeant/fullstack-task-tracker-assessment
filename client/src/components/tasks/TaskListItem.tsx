import React from "react";
import {TaskItem} from "../../types/types";

type Props = TaskItem;

export const TaskListItem: React.FC<Props> = ({ title, date }) => (
  <li style={{ listStyleType: "none" }}>
    <strong>{title}</strong>
    <p>{date}</p>
  </li>
);
