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
export const downloadGroupExcel = async (id: number): Promise<void> => {
  const response = await fetch(`http://localhost:8080/api/${id}/export`, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download Excel for group id ${id}`);
  }

  const blob = await response.blob();

  // Create a link to download the file
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `group_${id}.xlsx`;
  document.body.appendChild(link);
  link.click();

  // Cleanup
  link.remove();
  window.URL.revokeObjectURL(url);
};