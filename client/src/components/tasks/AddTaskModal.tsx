import React, {useState} from "react";
import {createTask} from "../../api/createTask";
import {TaskItem} from "../../types/types";

type Props = {
  onSubmit: (taskItem: TaskItem) => void;
  onCancel: () => void;
};

export const AddTaskModal: React.FC<Props> = ({onSubmit, onCancel}) => {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitHandler = () => {
    if (!title.trim()) {
      setErrorMessage("Please enter a title.");
    } else {
      createTask({title})
        .then(res => {
          setTitle("")
          onSubmit(res.data);
        })
    }
  }

  const onCancelHandler = () => {
    setTitle("");
    onCancel();
  };

  const onKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        onSubmitHandler();
        break;
      case "Escape":
        onCancelHandler();
        break;
      default:
        return;
    }
  };

  return (
    <>
      <label htmlFor={"title-input"}>Task Title</label>
      <input
        name={"TaskTitleInput"}
        id={"title-input"}
        placeholder={"Task Title"}
        value={title}
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={onKeyHandler}
      />
      <button onClick={onSubmitHandler} disabled={title === ""}>
        Submit
      </button>
      <button onClick={onCancel}>Cancel</button>
      {errorMessage && !title && <p style={{color: "red"}}>{errorMessage}</p>}
    </>
  );
};
