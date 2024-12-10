// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import HomePage from "./pages/HomePage";
import MentorPage from "./pages/MentorPage";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./components/PrivateRoute";
import OneMentorPage from "./pages/OneMentorPage";
import LogoutButton from "./components/LogoutButton";
import "./App.css";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on page load
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            height: "auto",
            paddingTop: "20px",
          }}
        >
          <Title level={3} style={{ color: "white", margin: 0 }}>
          South African Startup Ecosystem 🇿🇦
          </Title>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ flexGrow: 1, justifyContent: "center", width: "100%", height: "100%" }}
          >
            <Menu.Item key="/">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Home
              </NavLink>
            </Menu.Item>
            {!isAuthenticated ? (
              <>
                <Menu.Item key="/login">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                  >
                    Login
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="/signup">
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                  >
                    Sign Up
                  </NavLink>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="/mentors">
                  <NavLink
                    to="/mentors"
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                  >
                    Mentors
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="/profile">
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                  >
                    Profile
                  </NavLink>
                </Menu.Item>
              </>
            )}
          </Menu>
          {isAuthenticated && (
            <LogoutButton setIsAuthenticated={setIsAuthenticated} />
          )}
        </Header>
        <Content style={{ padding: "20px" }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected Routes */}
            <Route
              path="/mentors"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <MentorPage />
                </PrivateRoute>
              }
            />
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
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}>
        South African Startup Ecosystem 🇿🇦 ©2024 Created with ❤️
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
