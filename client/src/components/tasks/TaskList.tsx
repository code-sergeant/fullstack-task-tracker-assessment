import React from "react";
import {TaskListItem} from "./TaskListItem";
import {Grid, Typography} from "@material-ui/core";
import {TaskItem} from "../../types/types";

type Props = {
  tasks: TaskItem[];
  deleteTask: (deleteTaskInput: number) => void;
}

export const TaskList: React.FC<Props> = ({tasks, deleteTask}) =>
  <>
    {tasks.length > 0 ? (
      <Grid container item spacing={2} data-testid="task-list">
        {tasks.map((task, index) => (
          <TaskListItem
            key={`${task.title}-${index}`}
            task={task}
            deleteTask={deleteTask}
          />
        ))}
      </Grid>
    ) : (
      <Typography variant={"h6"} align={"center"}>No tasks have been added yet.</Typography>
    )}
  </>
