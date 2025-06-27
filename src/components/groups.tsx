import { Button, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { fetchGroups } from "../api/groupApi/groupApi";
import { fetchUsers } from "../api/userApi/userApi";
import { User } from "./reusable/User";
import { Group } from "./reusable/Group";
import { MinusOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import GroupDetails from "./groupDetails";

function Groups() {
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const columns = [
    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
      render: (_: any, record: Group) => (
        <div className="justify-center align-center flex">
          <Link to={`/groups/${record.id}`} key={record.id}>
  {record.groupName}
</Link>
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Add User to Group",
      key: "addUser",
      render: () => (
        <div className="justify-center align-center flex">
          <Button type="primary" onClick={showModal}>
            <PlusCircleOutlined />
          </Button>
        </div>
      ),
    },
    {
      title: "Remove User from Group",
      key: "removeUser",
      render: () => (
        <div className="justify-center align-center flex">
          <MinusOutlined />
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Group) => (
        <>
          <Button type="primary" danger className="mr-2">
            Delete
          </Button>
          <Button>Edit</Button>
        </>
      ),
    },
  ];

  return (
    <>
     <Link to={"/groups/create"}><Button className="m-5">Create new Group</Button></Link>
      <Table dataSource={groups} columns={columns} rowKey="id" />
      <Modal
        title="Add User to Group"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

export default Groups;
