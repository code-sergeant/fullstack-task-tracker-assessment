import axios from "axios";
import {DeleteTaskApiResponse} from "../types/types";

export const deleteTaskApi = async (taskId: number) =>
  axios.delete<DeleteTaskApiResponse>(`/api/tasks/${taskId}`)
    .then(res => res.status === 204)

