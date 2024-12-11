import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import LogoutButton from "./LogoutButton";
import logo from "../assets/logo.png";

const { Header } = Layout;
const { Title } = Typography;

const Navigation = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <Header
      style={{
        background: "#FFFFFF",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        padding: "0 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "auto",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "50%",
            border: "2px solid #6B21A8",
            padding: "4px",
            marginRight: "16px",
          }}
        />
        <Title
          level={3}
          style={{
            color: "#5B21B6",
            margin: 0,
            fontSize: "1.5rem",
            fontWeight: "600",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          South African Startup Space 
        </Title>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}> 
        <Menu
          mode="horizontal"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            border: "none",
            background: "transparent",
          }}
        >
          <Menu.Item key="/">
            <NavLink to="/">Home</NavLink>
          </Menu.Item>
          {!isAuthenticated ? (
            <>
              <Menu.Item key="/login">
                <NavLink to="/login">Login</NavLink>
              </Menu.Item>
              <Menu.Item key="/signup">
                <NavLink to="/signup">Sign Up</NavLink>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="/mentors">
                <NavLink to="/mentors">Mentors</NavLink>
              </Menu.Item>
              <Menu.Item key="/profile">
                <NavLink to="/profile">Profile</NavLink>
              </Menu.Item>
              <Menu.Item key="logout">
                <LogoutButton 
                  setIsAuthenticated={setIsAuthenticated} 
                  style={{ marginLeft: "16px" }} 
                />
              </Menu.Item>
            </>
          )}
        </Menu>
      </div>
    </Header>
  );
};

export default Navigation;
