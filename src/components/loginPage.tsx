import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type LoginFormValues = {
  email: string;
  password: string;
  remember?: boolean;
};

type LoginResponse = {
  token: string;
};

const login = async (data: LoginFormValues): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
      'http://localhost:8080/api/auth/login',
      data,
      { withCredentials: true }
  );
  return response.data;
};

function LoginPage() {
  const [form] = Form.useForm();
  const navigate=useNavigate();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      message.success('Успешно најавување!');
      navigate('/api/users')
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          message.error('Невалидна е-пошта или лозинка');
        } else {
          message.error('Грешка при најавување');
        }
      } else {
        message.error('Грешка при конекција');
      }
    },
  });

  const onFinish = (values: LoginFormValues) => {
    mutation.mutate(values);
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

          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Запамети ме</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
            >
              Најави се
            </Button>
          </Form.Item>
        </Form>
      </div>
  );
}

export default LoginPage;
