import axios from "axios";
import {CreateTaskApiResponse, CreateTaskInput} from "../types/types";

export const deleteTask = async (taskId: number) => axios.delete<CreateTaskApiResponse>(`/api/tasks/${taskId}`)
