import React from "react";
import {TaskItem} from "../../types/types";
import {Button, Card, CardActions, CardHeader, Grid} from "@material-ui/core";

type Props = {
  task: TaskItem;
  deleteTask: (deleteTaskInput: number) => void;
};

export const TaskListItem: React.FC<Props> = ({task, deleteTask}) =>
  <Grid container item spacing={2} xs={12}>
    <Grid item xs={12}>
      <Card elevation={8}>
        <CardHeader
          title={task.title}
          subheader={new Date(task.date).toDateString()}
        />
        <Grid item xs={12}>
          <CardActions>
            <Button
              variant={"contained"}
              color={"secondary"}
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </Button>
          </CardActions>
        </Grid>
      </Card>
    </Grid>
  </Grid>
