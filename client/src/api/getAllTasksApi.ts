import axios from "axios";
import {GetAllTasksApiResponse} from "../types/types";

export const getAllTasksApi = async () => axios.get<GetAllTasksApiResponse>('/api/tasks')
