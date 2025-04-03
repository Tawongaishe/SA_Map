import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Layout } from "antd";
import HomePage from "./pages/HomePage";
import MentorPage from "./pages/MentorPage";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./components/PrivateRoute";
import OneMentorPage from "./pages/OneMentorPage";
import Navigation from "./components/Navigation";
import StartupDirectory from "./pages/StartupDirectory";
import MentorOnboarding from "./components/MentorOnboarding";
import MentorOnboardingController from "./components/MentorOnboardingController";
import FeedbackForm from "./components/FeedbackForm";
import "./App.css";

const { Content, Footer } = Layout;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setCheckingAuth(true);
        const userId = localStorage.getItem("user_id");
        if (userId) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  // Handle successful login with mentor check
  const handleLoginSuccess = async (userData) => {
    setIsAuthenticated(true);
    localStorage.setItem("user_id", userData.id);
    
    // Check if user already has a mentor profile
    try {
      const response = await fetch('/api/mentors/me', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        if (!data.mentor) {
          // User doesn't have a mentor profile, redirect to onboarding
          return <Navigate to="/mentor-onboarding-flow" />;
        }
      }
    } catch (error) {
      console.error("Error checking mentor status:", error);
    }
    
    // Default navigation if there's an error or user has mentor profile
    return <Navigate to="/profile" />;
  };

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Layout style={{ minHeight: "100vh", background: "#EDE9FE" }}>
        <Navigation isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Content style={{ padding: "0", background: "#EDE9FE" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/mentors"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <MentorPage />
                </PrivateRoute>
              }
            />
            <Route path="/startups" element={<StartupDirectory />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Profile setIsAuthenticated={setIsAuthenticated} />
                </PrivateRoute>
              }
            />
            <Route
              path="/mentors/:mentorId"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <OneMentorPage />
                </PrivateRoute>
              }
            />
            {/* Current manual mentor onboarding page */}
            <Route path="/mentor-onboarding" element={<MentorOnboarding />} />
            
            {/* New automatic mentor onboarding flow */}
            <Route
              path="/mentor-onboarding-flow"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <MentorOnboardingController />
                </PrivateRoute>
              }
            />
          </Routes>
        </Content>
        {/* Feedback form button */}
        <FeedbackForm />
        {/* Footer */}
        <Footer
          style={{
            textAlign: "center",
            padding: "24px",
            background: "#FFFFFF",
            color: "#4B5563",
            fontSize: "0.875rem",
            borderTop: "1px solid #E5E7EB",
          }}
        >
          South African Startup Space 🇿🇦 ©2024 Created by Tawongaishe Nhawu❤️
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;