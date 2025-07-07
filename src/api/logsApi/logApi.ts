import axios from 'axios';
import { Log } from "../../components/reusable/Log";

const BASE_URL = 'http://localhost:8080/api/logs';

export const fetchLogs = async (): Promise<Log[]> => {
  const response = await axios.get<Log[]>(BASE_URL, {
    withCredentials: true, // send cookies with the request
  });

  return response.data;
}