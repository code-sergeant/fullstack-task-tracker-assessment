import React, {useContext} from "react";
import {TaskItem} from "../../types/types";
import {TasksContext} from "../../contexts/tasksContext";
import {Card, CardHeader, Grid, IconButton, Typography} from "@material-ui/core";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

type Props = {
  task: TaskItem
};

export const TaskListItem: React.FC<Props> = ({task}) => {
  const {deleteTask} = useContext(TasksContext)

  return (
    <Grid item xs={12}>
      <Card variant={"outlined"}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <DeleteForeverOutlinedIcon color={"error"} onClick={() => deleteTask(task.id)}/>
            </IconButton>
          }
          title={task.title}
          subheader={new Date(task.date).toDateString()}
        />
      </Card>
    </Grid>
  );
};
