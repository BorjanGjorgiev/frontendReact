
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Descriptions, Avatar, Tag, Spin, Alert } from "antd";
import { User } from "./reusable/User";
import axios from "axios";


const fetchUserProfile = async (): Promise<User> => {
    const res = await axios.get<User>("http://localhost:8080/api/auth/me", {
        withCredentials: true,
    });

    return res.data;
};

export function FetchUserProfile() {
    const {
        data: user,
        error,
        isLoading,
    } = useQuery<User>({
        queryKey: ["userProfile"],
        queryFn: fetchUserProfile,
    });

    if (isLoading) return <Spin tip="Вчитување..." />;
    if (error)
        return (
            <Alert
                type="error"
                message="Грешка"
                description={(error as Error).message}
                showIcon
            />
        );
    if (!user) return null;

    return (
        <Descriptions title="Кориснички профил" bordered column={1} size="middle">
            <Descriptions.Item label="Avatar">
                <Avatar style={{ backgroundColor: "#87d068" }} size={64}>
                    {user?.firstName[0]}
                    {user?.lastName[0]}
                </Avatar>
            </Descriptions.Item>
            <Descriptions.Item label="Име">{user?.firstName}</Descriptions.Item>
            <Descriptions.Item label="Презиме">{user?.lastName}</Descriptions.Item>
            <Descriptions.Item label="Е-пошта">{user?.email}</Descriptions.Item>
            <Descriptions.Item label="Улога">
                <Tag color={user?.role === "ADMIN" ? "red" : "blue"}>{user?.role}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Статус">
                <Tag color={user?.isAvailable ? "green" : "gray"}>
                    {user?.isAvailable ? "Достапен" : "Недостапен"}
                </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Група">
                {user?.group?.groupName || "Без група"}
            </Descriptions.Item>
            <Descriptions.Item label="Регистриран на">
                {new Date(user.createdAt).toLocaleString("mk-MK")}
            </Descriptions.Item>
        </Descriptions>
    );
};
