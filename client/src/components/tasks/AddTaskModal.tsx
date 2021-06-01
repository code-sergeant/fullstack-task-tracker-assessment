import React, {useContext, useState} from "react";
import {TasksContext} from "../../contexts/tasksContext";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  TextField
} from "@material-ui/core";

type Props = {
  onSubmit: () => void;
  onCancel: () => void;
};

export const AddTaskModal: React.FC<Props> = ({onSubmit, onCancel}) => {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {createTask} = useContext(TasksContext)

  const onSubmitHandler = async () => {
    if (!title.trim()) {
      setErrorMessage("Please enter a title.");
    } else {
      await createTask({title})
      setTitle("")
      onSubmit()
    }
  }

  const onCancelHandler = () => {
    setTitle("");
    onCancel();
  };

  const onKeyHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        await onSubmitHandler();
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
      <Dialog open={true} onClose={onCancel} aria-labelledby="form-dialog-title">
        <DialogTitle color={"#444"} id="form-dialog-title">Task Dialog</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} justify={"flex-end"}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                variant={"filled"}
                label="Task Title"
                type="text"
                placeholder={"Task Title"}
                fullWidth
                id={"title-input"}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={onKeyHandler}
              />
              <FormHelperText error={!!errorMessage} color={"error"}>{errorMessage}</FormHelperText>

            </Grid>
            <Grid item>
              <Button onClick={onCancel}>Cancel</Button>
              <Button variant={"contained"} color={"primary"} onClick={onSubmitHandler} disabled={title === ""}>
                Submit
              </Button>

            </Grid>

          </Grid>
        </DialogContent>
      </Dialog>

    </>
  );
};
