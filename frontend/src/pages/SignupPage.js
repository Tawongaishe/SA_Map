// src/pages/SignupPage.js
import React from "react";
import SignupForm from "../components/SignupForm";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/login"); // Redirect to mentorship page after signup
  };

  return <SignupForm onSignup={handleSignup} />;
};

export default SignupPage;
