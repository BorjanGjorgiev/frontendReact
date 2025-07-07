import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const registerUser = async (data: Omit<RegisterFormValues, 'confirmPassword'>) => {
  const response = await axios.post('http://localhost:8080/api/auth/register', data);
  return response.data;
};

function RegisterPage() {
  const [form] = Form.useForm();
  const navigate=useNavigate();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      message.success('Регистрацијата беше успешна! Можете да се најавите.');
      form.resetFields();
      navigate('/api/auth/login');
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          const errorMsg = error.response.data || 'Грешка при регистрација';
          message.error(errorMsg);
          form.setFields([
            {
              name: 'email',
              errors: [errorMsg],
            },
          ]);
        } else {
          message.error('Се појави грешка. Обиди се повторно.');
        }
      } else {
        message.error('Грешка при конекција');
      }
    },
  });

  const onFinish = (values: RegisterFormValues) => {
    const { firstName, lastName, email, password } = values;
    mutation.mutate({ firstName, lastName, email, password });
  };


 

  return (
      <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
          style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}
      >
        <Form.Item
            name="firstName"
            label="Име"
            rules={[{ required: true, message: 'Внеси го твоето име' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
            name="lastName"
            label="Презиме"
            rules={[{ required: true, message: 'Внеси го твоето презиме' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
            name="email"
            label="Е-пошта"
            rules={[
              { required: true, message: 'Внеси ја твојата е-пошта'},
              { type: 'email', message: 'Внеси валидна е-пошта'},
            ]}
            validateTrigger="onSubmit"
        >
          <Input />
        </Form.Item>

        <Form.Item
            name="password"
            label="Лозинка"
            rules={[{ required: true, message: 'Внеси лозинка' }]}
            hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
            name="confirmPassword"
            label="Потврди лозинка"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Потврди ја лозинката' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Лозинките не се совпаѓаат'));
                },
              }),
            ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
              type="primary"
              htmlType="submit"
              
              style={{ width: '100%' }}
          >
            Регистрирај се
          </Button>
        </Form.Item>
      </Form>
  );
};

export default RegisterPage;
