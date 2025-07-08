import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useAuth } from '../context/userAuth';
import { LoginFormValues } from './reusable/LoginFormValues';

function LoginPage() {
  const [form] = Form.useForm();
  const { loginUser } = useAuth();

  const onFinish = async (values: LoginFormValues) => {
    try {
      await loginUser(values.email, values.password);

    } catch (error) {
      message.error('Неуспешна најава');
    }
  };

  return (
      <div style={{ maxWidth: 400, margin: 'auto', marginTop: 100 }}>
        <Form form={form} name="login" onFinish={onFinish} autoComplete="off">
          <Form.Item
              label="Е-пошта"
              name="email"
              rules={[
                { required: true, message: 'Внеси ја твојата е-пошта' },
                { type: 'email', message: 'Внеси валидна е-пошта' },
              ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
              label="Лозинка"
              name="password"
              rules={[{ required: true, message: 'Внеси лозинка' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Најави се
            </Button>
          </Form.Item>
        </Form>
      </div>
  );
}

export default LoginPage;