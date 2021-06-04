import axios from "axios";
import {GetAllTasksApiResponse} from "../types/types";

export const getAllTasksApi = async () => axios.get<GetAllTasksApiResponse>('/api/tasks')
  .then(res => res.data._embedded.tasks)
