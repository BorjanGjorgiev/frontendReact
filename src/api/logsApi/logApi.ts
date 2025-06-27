import { Log } from "../../components/reusable/Log";

const BASE_URL = 'http://localhost:8080/api/logs';

export const fetchLogs = async (): Promise<Log[]> => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch logs');
    return await response.json();
  };