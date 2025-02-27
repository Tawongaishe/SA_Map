import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Layout } from "antd";
import HomePage from "./pages/HomePage";
import MentorPage from "./pages/MentorPage";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./components/PrivateRoute";
import OneMentorPage from "./pages/OneMentorPage";
import Navigation from "./components/Navigation"; // Import the new Navigation component
import StartupDirectory from "./pages/StartupDirectory";
import MentorOnboarding from "./pages/MentorOnboarding";
import "./App.css";

const { Content, Footer } = Layout;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      setIsAuthenticated(true);
    }
  }, []);

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
          <Route path="/mentor-onboarding" element={<MentorOnboarding />} />
          </Routes>
        </Content>
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
