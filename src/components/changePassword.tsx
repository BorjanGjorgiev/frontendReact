import React from 'react';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';

type FieldType = {
    oldPassword: string;
    newPassword: string;
    repeatPassword: string;
};

const ChangePassword: React.FC = () => {
    const onFinish = async (values: FieldType) => {
        if (values.newPassword !== values.repeatPassword) {
            message.error('Passwords do not match!');
            return;
        }

        try {
            const token = localStorage.getItem('token'); // or however you're storing it
            const response = await axios.post(
                'http://localhost:8080/api/auth/change-password',
                {
                    oldPassword: values.oldPassword,
                    newPassword: values.newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            message.success(response.data);
        } catch (error: any) {
            message.error(error.response?.data || 'Password change failed');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'left',
                marginTop: '100px',
            }}
        >
            <Form
                name="changePassword"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Old Password"
                    name="oldPassword"
                    rules={[{ required: true, message: 'Please input your old password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    label="New Password"
                    name="newPassword"
                    rules={[{ required: true, message: 'Please input your new password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Repeat Password"
                    name="repeatPassword"
                    rules={[{ required: true, message: 'Please repeat your new password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Change Password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangePassword;
