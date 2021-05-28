import axios from "axios";
import {UpdateTaskInput} from "../types/types";

export const updateTask = async (updateTaskInput: UpdateTaskInput) =>
  axios.put<UpdateTaskInput>(`/api/tasks/${updateTaskInput.id}`, updateTaskInput)
