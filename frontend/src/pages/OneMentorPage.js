import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Avatar, Tag, Typography, Divider } from 'antd';
import { UserOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';

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
                console.error('Error loading mentor data:', err);
                setError('Could not load profile data.');
            }
        };

        fetchMentorData();
    }, [mentorId]);

    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

    return (
        <div className="max-w-xl mx-auto p-4">
            {mentorData && (
                <>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-40 rounded-t-lg" />
                    
                    <Card 
                        className="-mt-20 p-5"
                        style={{ borderRadius: '8px' }}
                    >
                        <div className="flex gap-4 mb-6">
                            <Avatar 
                                src={mentorData.user.image} 
                                size={120} 
                                icon={!mentorData.user.image && <UserOutlined />}
                                className="border-4 border-white -mt-14"
                            />
                            <div className="flex-1 mt-2">
                                <Title level={3} style={{ marginTop: 0, marginBottom: '4px' }}>
                                    {mentorData.mentor.name}
                                </Title>
                                <div className="flex items-center gap-2">
                                    <EnvironmentOutlined className="text-gray-500" />
                                    <Text className="text-gray-500">
                                        {mentorData.user.location || 'Location not specified'}
                                    </Text>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-md mx-auto">
                            <div className="space-y-4">
                                <div>
                                    <Title level={4}>About</Title>
                                    <Paragraph>{mentorData.user.blurb || 'Nothing much for now!'}</Paragraph>
                                    <Divider />
                                </div>

                                <div>
                                    <Title level={4}>Expertise</Title>
                                    <div className="flex flex-wrap gap-2">
                                        {mentorData.mentor.expertises.length > 0 ? 
                                            mentorData.mentor.expertises.map((expertise, index) => (
                                                <Tag key={index} color="blue">{expertise}</Tag>
                                            )) : 
                                            <Text type="secondary">No expertise listed</Text>
                                        }
                                    </div>
                                    <Divider />
                                </div>

                                <div>
                                    <Title level={4}>Industries</Title>
                                    <div className="flex flex-wrap gap-2">
                                        {mentorData.user.industries.length > 0 ? 
                                            mentorData.user.industries.map((industry, index) => (
                                                <Tag key={index} color="cyan">{industry}</Tag>
                                            )) : 
                                            <Text type="secondary">No industries listed</Text>
                                        }
                                    </div>
                                    <Divider />
                                </div>

                                <div>
                                    <Title level={4}>Contact Information</Title>
                                    <div className="flex items-center gap-2">
                                        <PhoneOutlined className="text-gray-500" />
                                        <Text>{mentorData.mentor.contact_info}</Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </>
            )}
        </div>
    );
};

export default OneMentorPage;