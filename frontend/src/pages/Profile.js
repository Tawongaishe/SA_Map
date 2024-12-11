import React, { useState, useEffect } from 'react';
import { Layout, Avatar, Typography, Button, Input, Select, Tag, Card, Radio } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import MentorSignupForm from '../components/MentorSignupForm';

const { Title } = Typography;
const { TextArea } = Input;

const Profile = ({ setIsAuthenticated }) => {
    const [mentor, setMentor] = useState(null);
    const [user, setUser] = useState(null);
    const [industriesOptions, setIndustriesOptions] = useState([]);
    const [selectedIndustryIds, setSelectedIndustryIds] = useState([]);
    const [error, setError] = useState('');
    const [editingUser, setEditingUser] = useState(false);
    const [activeSection, setActiveSection] = useState('user');
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const userResponse = await fetch(`/api/users/me`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                if (!userResponse.ok) throw new Error('Failed to fetch user data');
                const userData = await userResponse.json();
                setUser(userData);
                setProfilePicture(userData.profilePicture || '/default-profile.png');

                const mentorResponse = await fetch(`/api/mentors/me`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                if (!mentorResponse.ok) throw new Error('Failed to fetch mentor data');
                const mentorData = await mentorResponse.json();
                setMentor(mentorData.mentor || null);

                const uniqueIndustryIds = [
                    ...new Set(
                        userData.industries.map((ind) =>
                            typeof ind === 'string' ? ind : ind.id
                        )
                    ),
                ];
                setSelectedIndustryIds(uniqueIndustryIds);

                const industriesResponse = await fetch(`/api/users/industries`, {
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

            const response = await fetch('/api/users/me', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUserData),
                credentials: 'include',
            });

            if (!response.ok) throw new Error('Failed to save changes');
            const updatedUser = await response.json();
            const resolvedIndustries = selectedIndustryIds.map(
                (id) => industriesOptions.find((industry) => industry.id === id) || id
            );

            setUser({
                ...updatedUser,
                industries: resolvedIndustries,
            });

            setEditingUser(false);
        } catch (err) {
            console.error('Error saving changes:', err);
        }
    };

    const handleRemoveIndustry = (id) => {
        setSelectedIndustryIds((prev) => prev.filter((industryId) => industryId !== id));
    };

    const handleProfilePictureUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const ProfileSection = ({ label, children }) => (
        <div style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{label}</div>
            <div>{children}</div>
        </div>
    );

    return (
        <Layout style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', background: '#EDE9FE' }}>
            <Card style={{ width: '100%', maxWidth: '800px', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', background: '#FAF5FF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <Radio.Group
                        value={activeSection}
                        onChange={(e) => setActiveSection(e.target.value)}
                        style={{ marginBottom: '16px' }}
                    >
                        <Radio.Button value="user" style={{ borderColor: '#A78BFA', color: '#6B21A8' }}>User Profile</Radio.Button>
                        <Radio.Button value="mentor" style={{ borderColor: '#A78BFA', color: '#6B21A8' }}>Mentor Profile</Radio.Button>
                    </Radio.Group>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <input 
                        type="file" 
                        id="profilePicUpload" 
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleProfilePictureUpload}
                    />
                    <label htmlFor="profilePicUpload">
                    <Avatar 
                            size={140} 
                            src={profilePicture} 
                            icon={<UserOutlined />} 
                            style={{ cursor: 'pointer', marginBottom: '16px', border: '2px solid #F97316' }}
                        />
                    </label>
                </div>
                {activeSection === 'user' && (
                    <div>
                        <Title level={3} style={{ marginBottom: '24px', color: '#6B21A8' }}>User Profile</Title>
                        {user && (
                            <>
                                <ProfileSection label="Location">
                                    {editingUser ? (
                                        <Input
                                            size="large"
                                            value={user?.location || ''}
                                            onChange={(e) => setUser(prevUser => ({
                                                ...prevUser,
                                                location: e.target.value
                                            }))}
                                        />
                                    ) : (
                                        user?.location || ''
                                    )}
                                </ProfileSection>
                                <ProfileSection label="About Me">
                                    {editingUser ? (
                                        <TextArea
                                            size="large"
                                            value={user?.blurb || ''}
                                            onChange={(e) => setUser(prevUser => ({
                                                ...prevUser,
                                                blurb: e.target.value
                                            }))}
                                            style={{ minHeight: '120px' }}
                                        />
                                    ) : (
                                        user?.blurb || ''
                                    )}
                                </ProfileSection>
                                <ProfileSection label="Industries">
                                    {editingUser ? (
                                        <Select
                                            mode="multiple"
                                            size="large"
                                            placeholder="Select industries"
                                            style={{ width: '100%' }}
                                            value={selectedIndustryIds}
                                            onChange={(values) => setSelectedIndustryIds(values)}
                                        >
                                            {industriesOptions.map((industry) => (
                                                <Select.Option key={industry.id} value={industry.id}>
                                                    {industry.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    ) : (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {user.industries?.map((industry, index) => (
                                                <Tag
                                                    key={index}
                                                    style={{ padding: '4px 12px', background: '#DDD6FE', color: '#6B21A8' }}
                                                >
                                                    {typeof industry === 'string' ? industry : industry.name}
                                                </Tag>
                                            ))}
                                        </div>
                                    )}
                                </ProfileSection>
                                <div style={{ marginTop: '32px', display: 'flex', gap: '8px' }}>
                                    {editingUser ? (
                                        <>
                                            <Button onClick={() => setEditingUser(false)}>
                                                Cancel
                                            </Button>
                                            <Button type="primary" onClick={handleSaveUserChanges}>
                                                Save Changes
                                            </Button>
                                        </>
                                    ) : (
                                        <Button type="primary" onClick={() => setEditingUser(true)}>
                                            Edit User Profile
                                        </Button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                )}
                {activeSection === 'mentor' && (
                    <div>
                        <Title level={3} style={{ marginBottom: '24px', color: '#6B21A8' }}>Mentor Profile</Title>
                        <p>Sign up to offer your expertise to people in the Startup network who may be looking.</p>
                        {mentor ? (
                            <>
                                <ProfileSection label="Name">
                                    {mentor.name}
                                </ProfileSection>
                                <ProfileSection label="Contact Info">
                                    {mentor.contact_info}
                                </ProfileSection>
                                <ProfileSection label="Expertise">
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {mentor.expertises?.map((expertise, index) => (
                                            <Tag
                                                key={index}
                                                style={{ padding: '4px 12px', background: '#DDD6FE', color: '#6B21A8' }}
                                            >
                                                {typeof expertise === 'string' ? expertise : expertise.name}
                                            </Tag>
                                        ))}
                                    </div>
                                </ProfileSection>
                                <div style={{ marginTop: '32px', display: 'flex', gap: '8px' }}>
                                    <Button type ="primary" onClick={() => setEditingUser(true)}>
                                        Edit Mentor Profile
                                    </Button>
                                </div>
                                {editingUser && (
                                    <MentorSignupForm
                                        mentor={mentor}
                                        onSuccess={(updatedMentor) => {
                                            setMentor(updatedMentor);
                                            setEditingUser(false);
                                        }}
                                    />
                                )}
                            </>
                        ) : (
                            <MentorSignupForm onSuccess={(newMentor) => setMentor(newMentor)} />
                        )}
                    </div>
                )}
            </Card>
        </Layout>
    );
};

export default Profile;