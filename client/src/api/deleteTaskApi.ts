import axios from "axios";
import {CreateTaskApiResponse} from "../types/types";

export const deleteTaskApi = async (taskId: number) => axios.delete<CreateTaskApiResponse>(`/api/tasks/${taskId}`)
