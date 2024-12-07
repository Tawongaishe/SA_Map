// src/components/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css';

const LogoutButton = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                localStorage.removeItem('user_id');
                setIsAuthenticated(false);
                navigate('/');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return <button onClick={handleLogout} className="logout-button">Logout</button>;
};

export default LogoutButton;
