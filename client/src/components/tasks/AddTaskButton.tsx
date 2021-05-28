import * as React from "react";

type Props = {
  addTaskHandler: () => void;
};

export const AddTaskButton: React.FC<Props> = ({ addTaskHandler }) => (
  <button autoFocus onClick={addTaskHandler}>
    Add Task
  </button>
);
