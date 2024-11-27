import React, { useState, useEffect } from 'react';
import { Collapse, Button, Input, Select, message, Typography, Space, Tag } from 'antd';
import MentorSignupForm from '../components/MentorSignupForm';

const { Panel } = Collapse;
const { TextArea } = Input;
const { Title } = Typography;

const Profile = ({ setIsAuthenticated }) => {
    const [mentor, setMentor] = useState(null);
    const [user, setUser] = useState(null);
    const [industriesOptions, setIndustriesOptions] = useState([]);
    const [selectedIndustryIds, setSelectedIndustryIds] = useState([]);
    const [error, setError] = useState('');
    const [editingUser, setEditingUser] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Fetch user data
                const userResponse = await fetch(`/users/me`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                if (!userResponse.ok) throw new Error('Failed to fetch user data');
                const userData = await userResponse.json();
                setUser(userData);

                // Initialize selectedIndustryIds from backend data
                const uniqueIndustryIds = [
                    ...new Set(
                        userData.industries.map((ind) =>
                            typeof ind === 'string' ? ind : ind.id
                        )
                    ),
                ];
                setSelectedIndustryIds(uniqueIndustryIds);

                // Fetch industries options
                const industriesResponse = await fetch(`/users/industries`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                if (!industriesResponse.ok) throw new Error('Failed to fetch industries');
                setIndustriesOptions(await industriesResponse.json());
            } catch (err) {
                console.error('Error fetching profile data:', err);
                setError('Failed to load profile data.');
            }
        };

        fetchProfileData();
    }, []);

    const handleSaveUserChanges = async () => {
        try {
            const updatedUserData = {
                location: user.location,
                blurb: user.blurb,
                industries: selectedIndustryIds,
            };

            const response = await fetch('/users/me', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUserData),
                credentials: 'include',
            });

            if (!response.ok) throw new Error('Failed to save changes');

            // Update user with resolved industries
            const updatedUser = await response.json();
            const resolvedIndustries = selectedIndustryIds.map(
                (id) => industriesOptions.find((industry) => industry.id === id) || id
            );

            setUser({
                ...updatedUser,
                industries: resolvedIndustries,
            });

            setEditingUser(false);
            message.success('User profile updated successfully!');
        } catch (err) {
            console.error('Error saving changes:', err);
            message.error('Failed to save user profile changes.');
        }
    };

    const handleRemoveIndustry = (id) => {
        setSelectedIndustryIds((prev) => prev.filter((industryId) => industryId !== id));
    };

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Profile Page 👤</Title>
            {error && <Typography.Text type="danger">{error}</Typography.Text>}

            <Collapse defaultActiveKey={['1']} ghost>
                {/* User Profile Section */}
                <Panel header="User Profile" key="1">
                    {user && (
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div>
                                <strong>Location:</strong>{' '}
                                {editingUser ? (
                                    <Input
                                        value={user.location || ''}
                                        onChange={(e) =>
                                            setUser({ ...user, location: e.target.value })
                                        }
                                    />
                                ) : (
                                    user.location || 'N/A'
                                )}
                            </div>

                            <div>
                                <strong>About Me:</strong>{' '}
                                {editingUser ? (
                                    <TextArea
                                        value={user.blurb || ''}
                                        onChange={(e) =>
                                            setUser({ ...user, blurb: e.target.value })
                                        }
                                    />
                                ) : (
                                    user.blurb || 'N/A'
                                )}
                            </div>

                            <div>
                                <strong>Industries:</strong>
                                <div>
                                    {user.industries.map((industry, index) => (
                                        <Tag
                                            key={index}
                                            closable={editingUser}
                                            onClose={() => handleRemoveIndustry(industry.id || industry)}
                                        >
                                            {typeof industry === 'string'
                                                ? industry
                                                : industry.name}
                                        </Tag>
                                    ))}
                                </div>
                                {editingUser && (
                                    <Select
                                        mode="multiple"
                                        placeholder="Select industries"
                                        style={{ width: '100%' }}
                                        value={selectedIndustryIds} // Reflect selected IDs
                                        onChange={(values) => setSelectedIndustryIds(values)}
                                    >
                                        {industriesOptions.map((industry) => (
                                            <Select.Option
                                                key={industry.id}
                                                value={industry.id}
                                            >
                                                {industry.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                )}
                            </div>

                            <Space>
                                <Button onClick={() => setEditingUser(!editingUser)}>
                                    {editingUser ? 'Cancel' : 'Edit User Profile'}
                                </Button>
                                {editingUser && (
                                    <Button type="primary" onClick={handleSaveUserChanges}>
                                        Save Changes
                                    </Button>
                                )}
                            </Space>
                        </Space>
                    )}
                </Panel>

                {/* Mentor Profile Section */}
                <Panel header="Mentor Profile" key="2">
                    {mentor ? (
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div>
                                <strong>Name:</strong> {mentor.name}
                            </div>
                            <div>
                                <strong>Contact Info:</strong> {mentor.contact_info}
                            </div>
                            <div>
                                <strong>Expertise:</strong>
                                <div>
                                    {mentor.expertises.map((expertise, index) => (
                                        <Tag key={index}>
                                            {typeof expertise === 'string' ? expertise : expertise.name || 'Unnamed'}
                                        </Tag>
                                    ))}
                                </div>
                            </div>

                            <Space>
                                <Button onClick={() => setEditingUser(!editingUser)}>
                                    {editingUser ? 'Cancel' : 'Edit Mentor Profile'}
                                </Button>
                            </Space>

                            {editingUser && (
                                <MentorSignupForm
                                    mentor={mentor}
                                    onSuccess={(updatedMentor) => {
                                        setMentor(updatedMentor);
                                        setEditingUser(false);
                                    }}
                                />
                            )}
                        </Space>
                    ) : (
                        <MentorSignupForm onSuccess={(newMentor) => setMentor(newMentor)} />
                    )}
                </Panel>
            </Collapse>
        </div>
    );
};

export default Profile;
