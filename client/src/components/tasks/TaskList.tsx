import React from "react";
import {TaskListItem} from "./TaskListItem";
import {TaskItem} from "../../types/types";

type Props = {
  tasks: TaskItem[];
};

export const TaskList: React.FC<Props> = ({tasks}) => (
  <>
    {tasks.length > 0 ? (
      <ul data-testid="task-list">
        {tasks.map((task, index) => (
          <TaskListItem
            key={`${task.title}-${index}`}
            task={task}
          />
        ))}
      </ul>
    ) : (
      <h4>No tasks have been added yet.</h4>
    )}
  </>
);
