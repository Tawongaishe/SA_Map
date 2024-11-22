// src/pages/LoginPage.js
import React from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        setIsAuthenticated(true);  // Update authentication state in parent component
        navigate('/mentors');   // Redirect to mentorship page after login
    };

    return (
        <div>
            <h2>Login to Your Account</h2>
            <LoginForm onLogin={handleLogin} />
        </div>
    );
};

export default LoginPage;
