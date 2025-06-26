
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
   
   return(<div className="flex flex-col justify-center align-items">
    <h1>Group: {group.groupName}</h1>
    <p>Created At: {group.createdAt}</p>
    <p>Users:</p>
    <div>
        {group.users.map((l)=>(<ul>
            <li>{l.firstName} {l.lastName} - {l.email}</li>
        </ul>))}
    </div>

   </div>)
}
export default GroupDetails