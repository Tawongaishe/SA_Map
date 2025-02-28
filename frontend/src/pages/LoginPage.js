// src/pages/LoginPage.js
import React from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const LoginPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Update authentication state
    setIsAuthenticated(true);
    
    // The userData might not be passed correctly, so let's avoid using userData.id
    // Instead, we'll check if user is authenticated using the credentials in the fetch call
    
    // Check if user has a mentor profile
    try {
      const mentorResponse = await fetch('/api/mentors/me', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      
      if (mentorResponse.ok) {
        const mentorData = await mentorResponse.json();
        if (!mentorData.mentor) {
          // User doesn't have a mentor profile, redirect to onboarding
          
          navigate("/mentor-onboarding-flow");
          return;
        }
      }
    } catch (error) {
      console.error("Error checking mentor status:", error);
    }
    
    // Default navigation to mentors page (or dashboard)
    navigate("/mentors");
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default LoginPage;