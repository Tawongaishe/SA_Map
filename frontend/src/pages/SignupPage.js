// src/pages/SignupPage.js
import React from 'react';
import SignupForm from '../components/SignupForm';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const navigate = useNavigate();

    const handleSignup = () => {
        navigate('/mentorship');  // Redirect to mentorship page after signup
    };

    return (
        <div>
            <h2>Create Your Account</h2>
            <SignupForm onSignup={handleSignup} />
        </div>
    );
};

export default SignupPage;
