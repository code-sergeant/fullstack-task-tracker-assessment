import * as React from "react";
import {Button} from "@material-ui/core";

type Props = {
  addTaskHandler: () => void;
};

export const AddTaskButton: React.FC<Props> = ({addTaskHandler}) => (
  <Button
    variant={"contained"}
    autoFocus
    onClick={addTaskHandler}
  >
    Add Task
  </Button>
);
