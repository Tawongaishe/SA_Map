import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Avatar, Tag, Typography, Divider, Button } from 'antd';
import { UserOutlined, EnvironmentOutlined, PhoneOutlined, LinkedinOutlined, CalendarOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const OneMentorPage = () => {
    const { mentorId } = useParams();
    const [mentorData, setMentorData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMentorData = async () => {
            try {
                const response = await fetch(`/api/mentors/${mentorId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });
                if (!response.ok) throw new Error('Failed to fetch mentor data');
                const data = await response.json();
                setMentorData(data);
            } catch (err) {
                setError('Could not load profile data.');
            }
        };

        fetchMentorData();
    }, [mentorId]);

    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            {mentorData && (
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    {/* Left Column - Profile Info */}
                    <div style={{ flex: '0 0 300px' }}>
                        <Card 
                            bordered={false}
                            style={{ 
                                borderRadius: '16px',
                                background: '#FFFFFF',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                            }}
                        >
                            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                <Avatar 
                                    src={mentorData.user.image} 
                                    size={120} 
                                    icon={!mentorData.user.image && <UserOutlined />}
                                    style={{
                                        border: '4px solid #EDE9FE',
                                        marginBottom: '1rem'
                                    }}
                                />
                                <Title level={3} style={{ margin: '0.5rem 0' }}>
                                    {mentorData.mentor.name}
                                </Title>
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    color: '#4B5563'
                                }}>
                                    <EnvironmentOutlined style={{ marginRight: '0.5rem' }} />
                                    <Text>{mentorData.user.location || 'Location not specified'}</Text>
                                </div>
                            </div>

                            <Button 
                                icon={<LinkedinOutlined />}
                                size="large"
                                block
                                style={{
                                    border: '1px solid #4C1D95',
                                    color: '#4C1D95'
                                }}
                                href={mentorData.mentor.linkedin}
                            >
                                Connect on LinkedIn
                            </Button>
                        </Card>
                    </div>

                    {/* Right Column - Detailed Info */}
                    <div style={{ flex: '1 1 600px' }}>
                        <Card 
                            bordered={false}
                            style={{ 
                                borderRadius: '16px',
                                background: '#FFFFFF',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                            }}
                        >
                            <div style={{ marginBottom: '2rem' }}>
                                <Title level={4} style={{ color: '#4C1D95' }}>About</Title>
                                <Paragraph style={{ fontSize: '1.1rem', color: '#1F2937' }}>
                                    {mentorData.user.blurb || 'No bio provided yet.'}
                                </Paragraph>
                            </div>

                            <Divider style={{ margin: '1.5rem 0' }} />

                            <div style={{ marginBottom: '2rem' }}>
                                <Title level={4} style={{ color: '#4C1D95' }}>Expertise</Title>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {mentorData.mentor.expertises.map((expertise, index) => (
                                        <Tag
                                            key={index}
                                            style={{
                                                background: '#EDE9FE',
                                                color: '#5B21B6',
                                                border: 'none',
                                                borderRadius: '16px',
                                                padding: '6px 16px',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            {expertise}
                                        </Tag>
                                    ))}
                                </div>
                            </div>

                            <Divider style={{ margin: '1.5rem 0' }} />

                            <div style={{ marginBottom: '2rem' }}>
                                <Title level={4} style={{ color: '#4C1D95' }}>Industries</Title>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {mentorData.user.industries.map((industry, index) => (
                                        <Tag
                                            key={index}
                                            style={{
                                                background: '#F3F4F6',
                                                color: '#4B5563',
                                                border: 'none',
                                                borderRadius: '16px',
                                                padding: '6px 16px',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            {industry}
                                        </Tag>
                                    ))}
                                </div>
                            </div>

                            <Divider style={{ margin: '1.5rem 0' }} />

                            <div style={{ marginBottom: '2rem' }}>
                                <Title level={4} style={{ color: '#4C1D95' }}>Mentor Needs</Title>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {mentorData.mentor.mentor_needs.map((need, index) => (
                                        <Tag
                                            key={index}
                                            style={{
                                                background: '#F3F4F6',
                                                color: '#4B5563',
                                                border: 'none',
                                                borderRadius: '16px',
                                                padding: '6px 16px',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            {need}
                                        </Tag>
                                    ))}
                                </div>
                            </div>
                            
                            <Divider style={{ margin: '1.5rem 0' }} />

                            <div>
                                <Title level={4} style={{ color: '#4C1D95' }}>Contact Information</Title>
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    color: '#4B5563',
                                    fontSize: '1.1rem'
                                }}>
                                    <PhoneOutlined style={{ marginRight: '0.75rem' }} />
                                    <Text>{mentorData.mentor.contact_info}</Text>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OneMentorPage;