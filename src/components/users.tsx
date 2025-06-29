import { MinusOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Switch, Table, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { fetchGroups } from "../api/groupApi/groupApi";
import { deleteUser, fetchUsers } from "../api/userApi/userApi";
import { Group } from "./reusable/Group";
import { User } from "./reusable/User";

function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const [usersData, groupsData] = await Promise.all([fetchUsers(), fetchGroups()]);
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
        setUsers((prev) => prev.filter((user) => user.id !== userId));
    };

    const handleRemoveUserFromGroup = async (userId: number, groupId: number | null) => {
        if (!groupId) {
            message.error("User is not in a group.");
            return;
        }
        try {
            await axios.post(`http://localhost:8080/api/api/users/${userId}/groups/${groupId}/remove`);
            const updatedUsers = await fetchUsers();
            setUsers(updatedUsers);
            message.success("User removed from group.");
        } catch (error: any) {
            message.error("Failed to remove user from group.");
        }
    };

    const showModal = (user: User) => {
        setSelectedUser(user);
        setSelectedGroupId(user.group?.id ?? null);
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (selectedUser && selectedGroupId !== null) {
            try {
                await axios.post(`http://localhost:8080/api/api/users/${selectedUser.id}/groups/${selectedGroupId}/place`);
                message.success("User added to group!");
                const updatedUsers = await fetchUsers();
                setUsers(updatedUsers);
            } catch (err) {
                message.error("Failed to add user to group.");
            }
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleAvailabilityChange = (checked: boolean, user: User) => {
        console.log(`User ${user.email} availability changed to: ${checked}`);

    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const columns = [
        { title: "First Name", dataIndex: "firstName", key: "firstName" },
        { title: "Last Name", dataIndex: "lastName", key: "lastName" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Role", dataIndex: "role", key: "role" },
        {
            title: "Is Available",
            dataIndex: "isAvailable",
            key: "isAvailable",
            render: (value: boolean, record: User) => (
                <Switch checked={value} onChange={(checked) => handleAvailabilityChange(checked, record)} />
            ),
        },
        { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: User) => (
                <>
                    <Button type="primary" danger className="mr-2" onClick={() => handleDeleteUser(record.id)}>
                        Delete
                    </Button>

                </>
            ),
        },
        {
            title: "Place User In Group",
            key: "add-to-group",
            render: (_: any, record: User) => (
                <div className="justify-center align-center flex">
                    <Button type="primary" onClick={() => showModal(record)}>
                        <PlusCircleOutlined />
                    </Button>
                </div>
            ),
        },
        {
            title: "Remove User From Group",
            key: "remove-from-group",
            render: (_: any, record: User) => (
                <div className="justify-center align-center flex">
                    <Button
                        type="text"
                        icon={<MinusOutlined />}
                        onClick={() => handleRemoveUserFromGroup(record.id, record.group?.id ?? null)}
                        danger
                    >
                        Remove from group
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Table dataSource={users} columns={columns} rowKey="id" />

            <Modal
                title="Add User to Group"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="OK"
                cancelText="Cancel"
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "40px" }}>
                    <div>
                        <p>
                            <strong>First Name:</strong> {selectedUser?.firstName}
                        </p>
                        <p>
                            <strong>Last Name:</strong> {selectedUser?.lastName}
                        </p>
                        <p>
                            <strong>Currently in Group:</strong> {selectedUser?.group?.groupName || "None"}
                        </p>
                    </div>
                    <div>
                        <label>
                            <strong>Select Group:</strong>
                        </label>
                        <br />
                        <select
                            style={{ width: 200, padding: "5px", marginTop: "8px" }}
                            value={selectedGroupId ?? ""}
                            onChange={(e) => setSelectedGroupId(Number(e.target.value))}
                        >
                            <option value="" disabled>
                                Select a group
                            </option>
                            {groups.map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.groupName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Users;
