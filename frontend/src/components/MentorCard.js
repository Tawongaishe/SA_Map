import React from "react";
import { Card, Tag, Button, Space, Avatar } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const MentorCard = ({ mentor }) => {
  return (
    <Card bordered={false} style={{ marginBottom: "1rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Image */}
        <Avatar
          src={mentor.image}
          size={32}
          icon={!mentor.image && <UserOutlined />}
          style={{ marginRight: "1rem" }}
        />

        {/* Name */}
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0 }}>{mentor.name}</h3>
        </div>

        {/* Call-to-Action */}
        <Link to={`/mentors/${mentor.id}`}>
          <Button variant="outlined" color="primary" size="small">
            profile
          </Button>
        </Link>
      </div>

      {/* Tags */}
      <div style={{ marginTop: "1rem", textAlign: "left" }}>
        {mentor.expertises && mentor.expertises.length > 0 ? (
          mentor.expertises.map((exp, index) => (
            // gray color for tags
            <Tag
            //   color="#2db7f5"
              key={index}
              style={{ marginBottom: "0.5rem", backgroundColor: "transparent" }}
            >
              {typeof exp === "string" ? exp : exp.name || "Unnamed"}
            </Tag>
          ))
        ) : (
          <p>No expertise listed.</p>
        )}
      </div>
    </Card>
  );
};

export default MentorCard;
