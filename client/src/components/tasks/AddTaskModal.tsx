import React from "react";
import {ServerTaskItem} from "../../types/types";

type Props = {
  onSubmit: (taskItem: ServerTaskItem) => void;
  onCancel: () => void;
};

export const AddTaskModal: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const onSubmitHandler = () => {};

  const onCancelHandler = () => {};

  const onKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {};

  return <></>;
};
