
import React from "react";
import { Card, Tag, Button, Avatar, Typography } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, EnvironmentOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

const MentorCard = ({ mentor }) => {
  const MAX_TAGS = 3;

  return (
    <Card 
      bordered={false} 
      style={{ 
        marginBottom: "1rem", 
        height: "200px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.3s",
      }}
      hoverable
    >
      <div style={{ display: "flex", alignItems: "start", gap: "1rem" }}>
        <Avatar
          src={mentor.image}
          size={48}
          icon={!mentor.image && <UserOutlined />}
          style={{ border: "2px solid #f0f0f0" }}
        />
        
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>{mentor.name}</h3>
            <Link to={`/mentors/${mentor.id}`}>
              <Button type="primary" size="small">profile</Button>
            </Link>
          </div>

          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            color: "#666",
            fontSize: "0.9rem",
            marginBottom: "0.75rem"
          }}>
            <EnvironmentOutlined style={{ marginRight: "4px", color: "#8c8c8c" }} />
            <span>{mentor.location || "Location not specified"}</span>
          </div>

          <div style={{ marginTop: "auto" }}>
            {mentor.expertises && mentor.expertises.length > 0 ? (
              <>
                {mentor.expertises.slice(0, MAX_TAGS).map((exp, index) => (
                  <Tag 
                    key={index} 
                    style={{ 
                      marginBottom: "0.5rem",
                      backgroundColor: "transparent",
                      border: "1px solid #d9d9d9",
                      borderRadius: "4px"
                    }}
                  >
                    {typeof exp === "string" ? exp : exp.name || "Unnamed"}
                  </Tag>
                ))}
                {mentor.expertises.length > MAX_TAGS && (
                  <Tag style={{ backgroundColor: "#f5f5f5" }}>
                    +{mentor.expertises.length - MAX_TAGS} more
                  </Tag>
                )}
              </>
            ) : (
              <Tag>No expertise listed</Tag>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MentorCard;

