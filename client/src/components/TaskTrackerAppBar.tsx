import {AppBar, Grid, Toolbar, Typography} from "@material-ui/core";
import {AddTaskButton} from "./tasks/AddTaskButton";
import React from "react";

type Props = {
  isTaskModalOpen: boolean;
  setIsTaskModalOpen: (isOpen: boolean) => void
}
export const TaskTrackerAppBar: React.FC<Props> = ({isTaskModalOpen, setIsTaskModalOpen}) => <AppBar position={"static"} style={{marginBottom: 20}}>
  <Toolbar>
    <Grid container spacing={2} justify={"space-between"}>
      <Grid item>
        <Typography variant={"h4"}>Task Tracker</Typography>
      </Grid>
      <Grid item>
        {!isTaskModalOpen && (
          <AddTaskButton
            addTaskHandler={() => setIsTaskModalOpen(!isTaskModalOpen)}
          />
        )}
      </Grid>
    </Grid>
  </Toolbar>
</AppBar>;