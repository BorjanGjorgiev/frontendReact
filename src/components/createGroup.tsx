import React from 'react';
import { FormProps, message } from 'antd';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type FieldType = {
  groupname?: string;
};

const CreateGroup = () => {

    const navigate = useNavigate();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const response = await axios.post('http://localhost:8080/api/groups/create', {
        groupName: values.groupname,
      });
      message.success('Group created successfully!');
      console.log('Success:', response.data);
      navigate('/api/groups');
    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to create group');
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, paddingTop: 10 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="flex justify-center"
    >
      <Form.Item<FieldType>
        label="Group Name"
        name="groupname"
        rules={[{ required: true, message: 'Please input the group name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateGroup;
