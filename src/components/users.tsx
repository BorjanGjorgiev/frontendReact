import { MinusOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Switch, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { fetchGroups } from "../api/groupApi/groupApi";
import { deleteUser, fetchUsers, removeUserFromGroup } from "../api/userApi/userApi";
import { Group } from "./reusable/Group";
import { User } from "./reusable/User";

function Users()
{
 


 const [users, setUsers] = useState<User[]>([]);
 const [groups,setGroups]=useState<Group[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);
 useEffect(() => {
  const load = async () => {
    try {
      const [usersData, groupsData] = await Promise.all([
        fetchUsers(),
        fetchGroups(),
      ]);
      setUsers(usersData);
      setGroups(groupsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  load();
}, []);

const handleDeleteUser = async (userId: number) => {
  await deleteUser(userId);
  setUsers(prev => prev.filter(user => user.id !== userId));
};

const handleRemoveUserFromGroup = async (userId: number, groupId: number) => {
  await removeUserFromGroup(userId, groupId);
  const updatedUsers = await fetchUsers();
  setUsers(updatedUsers);
};
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;

    const handleAvailabilityChange = (checked: boolean, user: User) => {
    console.log(`User ${user.email} availability changed to: ${checked}`);
}

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
              {
                title: 'Is Available',
                dataIndex: 'isAvailable',
                key: 'isAvailable',
                render: (value: boolean, record: User) => (
                  <Switch 
                    checked={value}
                    onChange={(checked) => handleAvailabilityChange(checked, record)}
                  />
                ),
              },
              {
                title: 'Created at',
                dataIndex: 'createdAt',
                key: 'createdAt',
              },
              {
                title: 'Action',
                dataIndex: '',
                key: '',
                render:(_:any,record:User)=>
                {
                   return(<>
                   <Button type="primary" className="mr-2" danger onClick={()=>deleteUser(record.id)}>Delete</Button>
                   <Button>Edit</Button>
                   </>) 
                }
              },
              {
                title: 'Place User In Group',
                dataIndex: '',
                key: '',
                render:()=>
                {
                    return(<div className="justify-center align-center flex"><Button type="primary" onClick={showModal}>
                    <PlusCircleOutlined/>
                  </Button>
        <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
         >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      </div>)
                }
              },
              {
                title: 'Remove User From Group',
                dataIndex: '',
                key: '',
                render:()=>
                {
                    return(<div className="justify-center align-center flex"><MinusOutlined /></div>)
                }
              },
          ];
        return (
            <Table dataSource={users} columns={columns} />
        );
}
export default Users;



