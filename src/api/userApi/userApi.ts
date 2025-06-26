import axios from 'axios';
import { User } from '../../components/reusable/User'; // Adjust the import path as needed

const BASE_URL = 'http://localhost:8080/api/users';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch users');
  return await response.json();
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/delete/${id}`);
};

export const removeUserFromGroup = async (userId: number, groupId: number): Promise<void> => {
  await axios.post(`${BASE_URL}/${userId}/groups/${groupId}/remove`);
};