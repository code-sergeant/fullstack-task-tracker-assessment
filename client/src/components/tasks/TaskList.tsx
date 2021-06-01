import React, {useContext, useEffect} from "react";
import {TaskListItem} from "./TaskListItem";
import {TasksContext} from "../../contexts/tasksContext";
import {Grid} from "@material-ui/core";

export const TaskList: React.FC = () => {
  const {tasks} = useContext(TasksContext)

  return (
    <>
      {tasks.length > 0 ? (
        <Grid container item spacing={2} data-testid="task-list">
          {tasks.map((task, index) => (
            <TaskListItem
              key={`${task.title}-${index}`}
              task={task}
            />
          ))}
        </Grid>
      ) : (
        <h4>No tasks have been added yet.</h4>
      )}
    </>
  );
};
