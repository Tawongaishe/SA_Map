import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';

const LoginForm = ({ onLogin }) => {
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const { email, password } = values;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user_id', data.session);
                onLogin();
                message.success('Login successful');
            } else if (response.status === 404) {
                message.warning('No account found with this email. Redirecting to signup...');
                navigate('/signup');
            } else if (response.status === 401) {
                message.error('Incorrect password');
            } else {
                message.error('Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            message.error('An error occurred. Please try again.');
        }
    };

    return (
        <Form
            layout="vertical"
            onFinish={handleSubmit}
            style={{ maxWidth: '400px', margin: '0 auto' }}
        >
            <h2>Login to Your Account</h2>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please enter your email!' },
                    { type: 'email', message: 'Please enter a valid email!' },
                ]}
            >
                <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: 'Please enter your password!' },
                ]}
            >
                <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
