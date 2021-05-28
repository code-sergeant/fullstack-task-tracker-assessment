import axios from "axios";
import {GetAllTasksApiResponse} from "../types/types";

export const getAllTasks = async () => axios.get<GetAllTasksApiResponse>('/api/tasks')
