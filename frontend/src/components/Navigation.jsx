import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu, Typography, Button, Drawer, Row, Col, Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import LogoutButton from "./LogoutButton";
import logo from "../assets/logo.png";

const { Header } = Layout;
const { Title } = Typography;

const Navigation = ({ isAuthenticated, setIsAuthenticated }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      key: "/",
      label: <NavLink to="/">Home</NavLink>
    },
    {
      key: "/startups",
      label: <NavLink to="/startups">Startups</NavLink>
    },
    ...(isAuthenticated
      ? [
          {
            key: "/mentors",
            label: <NavLink to="/mentors">Mentors</NavLink>
          },
          {
            key: "/profile",
            label: <NavLink to="/profile">Profile</NavLink>
          },
          {
            key: "logout",
            label: (
              <LogoutButton
                setIsAuthenticated={setIsAuthenticated}
              />
            )
          }
        ]
      : [
          {
            key: "/login",
            label: <NavLink to="/login">Login</NavLink>
          },
          {
            key: "/signup",
            label: <NavLink to="/signup">Sign Up</NavLink>
          }
        ])
  ];

  return (
    <Header
      style={{
        background: "#FFFFFF",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        padding: "0 24px",
        height: "auto",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Row 
        justify="space-between" 
        align="middle"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 0" }}
      >
        <Row xs={20} sm={16} md={12} style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
        }}>
          {/* <Space> */}
            <NavLink style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#5B21B6",
                fontSize: "1.5rem",
                fontWeight: "600",
                textDecoration: "none",
            }} to="/">
            <img
              src={logo}
              alt="Logo"
              style={{
                height: "60px",
                width: "60px",
                borderRadius: "50%",
                border: "2px solid #6B21A8",
                padding: "4px",
                // center the image in the circle

              }}
            />
            </NavLink>
            
            {/* <Title
              level={3}
              style={{
                color: "#5B21B6",
                margin: 0,
                fontSize: "1.5rem",
                fontWeight: "600",
              }}
              ellipsis={{ rows: 1 }}
            >
              South African Startup Space
            </Title> */}
          {/* </Space> */}
        </Row>

        <Col xs={4} sm={8} md={12}>
          <Row justify="end" align="middle">
            <Col xs={24} sm={24} md={0}>
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileMenuOpen(true)}
                style={{
                  fontSize: "20px",
                  width: "46px",
                  height: "46px",
                  float: "right"
                }}
              />
            </Col>
            <Col xs={0} sm={0} md={24}>
              <Menu
                mode="horizontal"
                items={menuItems}
                style={{
                  border: "none",
                  background: "transparent",
                  justifyContent: "flex-end"
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
      >
        <Menu
          mode="vertical"
          items={menuItems}
          style={{
            border: "none",
            background: "transparent",
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      </Drawer>
    </Header>
  );
};

export default Navigation;