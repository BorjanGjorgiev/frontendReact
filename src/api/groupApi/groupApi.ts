import { Group } from '../../components/reusable/Group'; // Adjust the import path as needed

const BASE_URL = 'http://localhost:8080/api/groups';

export const fetchGroups = async (): Promise<Group[]> => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch groups');
  return await response.json();
};



export const groupDetail = async (id: number): Promise<Group> => {
  const response=await fetch(`http://localhost:8080/api/${id}`);
  if(!response.ok) throw new Error(`Failed to fetch group with id ${id}`);

  return await response.json();
};
