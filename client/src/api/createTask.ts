import axios from "axios";
import {CreateTaskApiResponse, CreateTaskInput} from "../types/types";

export const createTask = async (createTaskInput: CreateTaskInput) => axios.post<CreateTaskApiResponse>('/api/tasks', createTaskInput)
