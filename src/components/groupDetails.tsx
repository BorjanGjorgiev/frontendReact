
import { Table } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { groupDetail } from "../api/groupApi/groupApi";
import { Group } from "./reusable/Group";

function GroupDetails()
{
    const{id}=useParams();
    const[group,setGroup]=useState<Group|null>(null)
    const [error, setError] = useState<string | null>(null);

   
   useEffect(()=>
   {
    if(!id) return;

    groupDetail(Number(id))
    .then(setGroup)
    .catch((err)=>setError(err.message))

   },[id])
   if (error) return <div>Error: {error}</div>;
  if (!group) return <div>Loading...</div>;

  const columns = [
    {
      title: 'FirstName',
      dataIndex: 'firstName',
      key: 'firstname',
    },
    {
      title: 'LastName',
      dataIndex: 'lastName',
      key: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
      },
  ]
   
   return(<div className=" flex-col justify-center align-center">
    <h1 className="text-3xl font-bold">Group: {group.groupName}</h1>
    <p className="text-3xl font-bold">Created At: {group.createdAt}</p>
    <p className="text-3xl font-bold">Users:</p>
    <div>
       <Table dataSource={group.users} columns={columns}></Table>
    </div>

   </div>)
}
export default GroupDetails