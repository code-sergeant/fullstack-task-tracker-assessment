import axios from "axios";
import {CreateTaskApiResponse, CreateTaskInput} from "../types/types";

export const createTaskApi = async (createTaskInput: CreateTaskInput) =>
  axios.post<CreateTaskApiResponse>('/api/tasks', createTaskInput)
    .then(res => res.data)
