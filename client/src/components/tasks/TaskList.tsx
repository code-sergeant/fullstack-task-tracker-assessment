import React, {useContext, useEffect} from "react";
import {TaskListItem} from "./TaskListItem";
import {TasksContext} from "../../contexts/tasksContext";

export const TaskList: React.FC = () => {
  const {tasks} = useContext(TasksContext)

  return (
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
};
