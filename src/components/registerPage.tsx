import {Button, Form, Input} from "antd";
import { useAuth } from "../context/userAuth";
import {RegisterFormValues} from "./reusable/RegisterFormValues";

function RegisterPage() {
  const [form] = Form.useForm();
  const { registerUser } = useAuth(); // 👈 Use the context

  const onFinish = async (values: RegisterFormValues) => {
    const { firstName, lastName, email, password, confirmPassword } = values;

    // Call registerUser from context
    await registerUser(firstName, lastName, email, password, confirmPassword);

    // Optionally reset the form (if registration was successful)
    form.resetFields();
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
              { required: true, message: 'Внеси ја твојата е-пошта' },
              { type: 'email', message: 'Внеси валидна е-пошта' },
            ]}
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
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Регистрирај се
          </Button>
        </Form.Item>
      </Form>
  );
}

export default RegisterPage;