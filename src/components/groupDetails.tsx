import { Button, message, Table, Upload, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { downloadGroupExcel, groupDetail } from "../api/groupApi/groupApi";
import { Group } from "./reusable/Group";
import axios from "axios";

const { Dragger } = Upload;

function GroupDetails() {
    const { id } = useParams();
    const [group, setGroup] = useState<Group | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [resultRows, setResultRows] = useState<any[]>([]);

    useEffect(() => {
        if (!id) return;

        groupDetail(Number(id))
            .then(setGroup)
            .catch((err) => setError(err.message));
    }, [id]);

    if (error) return <div>Error: {error}</div>;
    if (!group) return <div>Loading...</div>;

    const columns = [
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
    ];

    const uploadProps: UploadProps = {
        name: "file",
        multiple: false,
        customRequest: async (options) => {
            const { file, onSuccess, onError } = options;
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await axios.post(
                    `http://localhost:8080/api/groups/${id}/import`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                message.success("Users imported successfully");
                setResultRows(response.data); // Optional: show results
                onSuccess?.(response.data, file);
                // Optionally re-fetch group users
                groupDetail(Number(id)).then(setGroup);
            } catch (error) {
                message.error("Import failed");
                onError?.(error as any);
            }
        },
        showUploadList: false,
    };

    return (
        <div className="flex-col justify-center align-center">
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: 20,
                    marginTop: 10,
                }}
            >
                <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">📁</p>
                    <p className="ant-upload-text">
                        Click or drag Excel file to upload
                    </p>
                    <p className="ant-upload-hint">
                        Only .xlsx files with user info (first name, last name, email,
                        role)
                    </p>
                </Dragger>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: 20,
                    marginTop: 10,
                }}
            >
                <Button
                    onClick={() => {
                        if (!id) {
                            setError("Group ID is missing");
                            return;
                        }
                        const groupId = Number(id);
                        if (isNaN(groupId)) {
                            setError("Invalid Group ID");
                            return;
                        }
                        downloadGroupExcel(groupId).catch((e) =>
                            setError("Failed to download Excel: " + e.message)
                        );
                    }}
                >
                    Export to Excel
                </Button>
            </div>

            <h1 className="text-3xl font-bold">Group: {group.groupName}</h1>
            <p className="text-3xl font-bold">Created At: {group.createdAt}</p>
            <p className="text-3xl font-bold">Users:</p>

            <Table dataSource={group.users} columns={columns} rowKey="email" />
        </div>
    );
}

export default GroupDetails;
