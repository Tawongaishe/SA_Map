import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Typography, Button, Input, Select, Tag } from 'antd';
import { 
    UserOutlined, 
    StarOutlined 
} from '@ant-design/icons';
import MentorSignupForm from '../components/MentorSignupForm';
import { profileStyles as styles } from './ProfileStyles';

const { Sider, Content } = Layout;
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
        <div style={styles.section}>
            <div style={styles.label}>{label}</div>
            <div style={styles.value}>{children}</div>
        </div>
    );

    return (
        <Layout>
            <Sider width={280} theme="light" style={styles.sider}>
                <div style={styles.siderContent}>
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
                            style={styles.avatar}
                        />
                    </label>
                    {user && (
                        <Title level={3} style={{ margin: '8px 0 0 0' }}>
                            {user.name}
                        </Title>
                    )}
                </div>
                <Menu 
                    mode="inline" 
                    selectedKeys={[activeSection]}
                    onSelect={({ key }) => setActiveSection(key)}
                    style={{ fontSize: '16px', border: 'none' }}
                >
                    <Menu.Item key="user" icon={<UserOutlined />}>
                        User Profile
                    </Menu.Item>
                    <Menu.Item key="mentor" icon={<StarOutlined />}>
                        Mentor Profile
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout>
                <Content style={styles.content}>
                    {activeSection === 'user' && (
                        <div>
                            <Title level={2} style={{ marginBottom: '32px' }}>
                                User Profile
                            </Title>
                            {user && (
                                <>
                                    <ProfileSection label="Location">
                                        {!editingUser ? user?.location || '' : null}
                                    </ProfileSection>

                                    <ProfileSection label="About Me">
                                        {!editingUser ? user?.blurb || '' : null}
                                    </ProfileSection>

                                    <ProfileSection label="Industries">
                                        <div>
                                            {user.industries?.map((industry, index) => (
                                                <Tag
                                                    key={index}
                                                    style={{ padding: '4px 12px', margin: '4px' }}
                                                >
                                                    {typeof industry === 'string' ? industry : industry.name}
                                                </Tag>
                                            ))}
                                        </div>
                                    </ProfileSection>

                                    <div style={{ marginTop: '32px' }}>
                                        {!editingUser ? (
                                            <Button 
                                                onClick={() => setEditingUser(true)}
                                                style={styles.editButton}
                                            >
                                                Edit User Profile
                                            </Button>
                                        ) : (
                                            <div style={{ border: '1px solid #f0f0f0', padding: '24px', borderRadius: '8px' }}>
                                                <Title level={4} style={{ marginBottom: '24px' }}>Edit Profile</Title>
                                                
                                                <div style={{ marginBottom: '16px' }}>
                                                    <div style={{ marginBottom: '8px' }}>Location</div>
                                                    <Input
                                                        size="large"
                                                        value={user?.location || ''}
                                                        onChange={(e) => setUser(prevUser => ({
                                                            ...prevUser,
                                                            location: e.target.value
                                                        }))}
                                                    />
                                                </div>

                                                <div style={{ marginBottom: '16px' }}>
                                                    <div style={{ marginBottom: '8px' }}>About Me</div>
                                                    <TextArea
                                                        size="large"
                                                        value={user?.blurb || ''}
                                                        onChange={(e) => setUser(prevUser => ({
                                                            ...prevUser,
                                                            blurb: e.target.value
                                                        }))}
                                                        style={{ minHeight: '120px' }}
                                                    />
                                                </div>

                                                <div style={{ marginBottom: '24px' }}>
                                                    <div style={{ marginBottom: '8px' }}>Industries</div>
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
                                                </div>

                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <Button onClick={() => setEditingUser(false)}>
                                                        Cancel
                                                    </Button>
                                                    <Button type="primary" onClick={handleSaveUserChanges}>
                                                        Save Changes
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {activeSection === 'mentor' && (
                        <div>
                            <Title level={2} style={{ marginBottom: '32px' }}>
                                Mentor Profile
                            </Title>
                            {mentor ? (
                                <>
                                    <ProfileSection label="Name">
                                        {mentor.name}
                                    </ProfileSection>
                                    
                                    <ProfileSection label="Contact Info">
                                        {mentor.contact_info}
                                    </ProfileSection>

                                    <ProfileSection label="Expertise">
                                        <div>
                                            {mentor.expertises?.map((expertise, index) => (
                                                <Tag key={index} style={{ padding: '4px 12px', margin: '4px' }}>
                                                    {typeof expertise === 'string' ? expertise : expertise.name}
                                                </Tag>
                                            ))}
                                        </div>
                                    </ProfileSection>

                                    <div style={{ marginTop: '32px' }}>
                                        <Button 
                                            onClick={() => setEditingUser(true)}
                                            style={styles.editButton}
                                        >
                                            Edit Mentor Profile
                                        </Button>
                                    </div>

                                    {editingUser && (
                                        <div style={{ marginTop: '24px' }}>
                                            <MentorSignupForm
                                                mentor={mentor}
                                                onSuccess={(updatedMentor) => {
                                                    setMentor(updatedMentor);
                                                    setEditingUser(false);
                                                }}
                                            />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <MentorSignupForm onSuccess={(newMentor) => setMentor(newMentor)} />
                            )}
                        </div>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Profile;