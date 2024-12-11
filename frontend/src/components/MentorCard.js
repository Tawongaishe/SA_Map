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
                background: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                height: '100%',
                minHeight: '200px',
            }}
            hoverable
        >
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                {/* Header section with avatar and basic info */}
                <div style={{ display: "flex", alignItems: "start", gap: "16px", marginBottom: "16px" }}>
                    <Avatar
                        src={mentor.image}
                        size={56}
                        icon={!mentor.image && <UserOutlined />}
                        style={{
                            backgroundColor: '#f0f2f5',
                            border: '2px solid #ffffff',
                        }}
                    />
                    
                    <div style={{ flex: 1 }}>
                        <h3 style={{
                            margin: 0,
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#1a1a1a',
                            marginBottom: '4px'
                        }}>
                            {mentor.name}
                        </h3>
                        
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            color: '#666666',
                            fontSize: '14px'
                        }}>
                            <EnvironmentOutlined style={{ marginRight: "6px", color: "#8c8c8c" }} />
                            <span>{mentor.location || "Location not specified"}</span>
                        </div>
                    </div>
                </div>

                {/* Expertise tags */}
                <div style={{ flex: 1, marginBottom: '16px' }}>
                    {mentor.expertises && mentor.expertises.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {mentor.expertises.slice(0, MAX_TAGS).map((exp, index) => (
                                <Tag
                                    key={index}
                                    style={{
                                        background: '#EEF2FF',
                                        color: '#4F46E5',
                                        border: 'none',
                                        borderRadius: '16px',
                                        padding: '4px 12px',
                                        fontSize: '13px',
                                        margin: 0
                                    }}
                                >
                                    {typeof exp === "string" ? exp : exp.name || "Unnamed"}
                                </Tag>
                            ))}
                            {mentor.expertises.length > MAX_TAGS && (
                                <Tag
                                    style={{
                                        background: '#F3F4F6',
                                        color: '#6B7280',
                                        border: 'none',
                                        borderRadius: '16px',
                                        padding: '4px 12px',
                                        fontSize: '13px',
                                        margin: 0
                                    }}
                                >
                                    +{mentor.expertises.length - MAX_TAGS} more
                                </Tag>
                            )}
                        </div>
                    ) : (
                        <Tag>No expertise listed</Tag>
                    )}
                </div>

                {/* View Profile button */}
                <Link to={`/mentors/${mentor.id}`} style={{ display: 'block' }}>
                <Button
                        type="default"
                        style={{
                            width: '100%',
                            height: '40px',
                            background: 'transparent',
                            border: '1px solid #5B21B6',
                            color: '#5B21B6',
                            borderRadius: '8px',
                            transition: 'all 0.2s'
                        }}
                        className="hover:bg-purple-50"
                    >
                        View Profile
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default MentorCard;