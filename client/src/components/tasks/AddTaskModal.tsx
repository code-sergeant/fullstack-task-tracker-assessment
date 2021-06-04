import React, {useState} from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle, FormControl,
  FormHelperText,
  Grid,
  TextField
} from "@material-ui/core";
import {CreateTaskInput} from "../../types/types";

type Props = {
  open: boolean;
  toggleOpen: () => void;
  createTask: (taskInput: CreateTaskInput) => void;
};

export const AddTaskModal: React.FC<Props> = ({open, toggleOpen, createTask}) => {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitHandler = () => {
    if (!title.trim()) {
      setErrorMessage("Please enter a title.");
    } else {
      createTask({
        title
      });
      setTitle("");
      setErrorMessage("");
    }
  }

  const onKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        onSubmitHandler();
        break;
      case "Escape":
        toggleOpen();
        break;
      default:
        return;
    }
  };

  return (
    <>
      <Dialog open={open} onClose={toggleOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Task Dialog</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} justify={"flex-end"}>
            <Grid item xs={12}>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>
            <Grid item>
              <Button onClick={toggleOpen}>Cancel</Button>
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
