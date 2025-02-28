import React, { useState, useEffect } from 'react';
import { Layout, Avatar, Typography, Button, Tag, Card, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import MentorSignupForm from '../components/MentorSignupForm';
import UserProfileForm from '../components/UserProfileForm';
import Link from 'antd/es/typography/Link';

const { Title } = Typography;

// Helper function to get icon filename from ID
const getProfileIcon = (iconId) => {
    // Default to learning icon if no ID is provided
    const id = iconId || 4;
    return `/icons/${id}.png`;
};

// Mapping of icon IDs to their labels
const iconLabels = {
    1: 'Building',
    2: 'Funding/Raising',
    3: 'Connecting',
    4: 'Learning'
};

const Profile = ({ setIsAuthenticated }) => {
    const [mentor, setMentor] = useState(null);
    const [user, setUser] = useState(null);
    const [industriesOptions, setIndustriesOptions] = useState([]);
    const [, setError] = useState('');
    const [editingUser, setEditingUser] = useState(false);
    const [editingMentor, setEditingMentor] = useState(false);
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

                // If mentor has a profile_icon_id, use that for the avatar instead
                if (mentorData.mentor && mentorData.mentor.profile_icon_id) {
                    setProfilePicture(getProfileIcon(mentorData.mentor.profile_icon_id));
                }

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

    const handleUserProfileSuccess = (updatedUser) => {
        setUser(updatedUser);
        setEditingUser(false);
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
                <Title level={2} style={{ textAlign: 'center', marginBottom: '24px', color: '#6B21A8' }}>Your Profile</Title>
                
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <Avatar 
                        size={140} 
                        src={mentor?.profile_icon_id ? getProfileIcon(mentor.profile_icon_id) : profilePicture} 
                        icon={(!mentor?.profile_icon_id && !profilePicture) && <UserOutlined />} 
                        style={{ marginBottom: '16px', border: '2px solid #F97316' }}
                    />
                    {mentor?.profile_icon_id && (
                        <div style={{ textAlign: 'center', marginTop: '8px' }}>
                            <Tag
                                style={{
                                    background: '#DDD6FE',
                                    color: '#6B21A8',
                                    border: 'none',
                                    borderRadius: '16px',
                                    padding: '6px 16px',
                                    fontSize: '0.9rem',
                                    display: 'inline-block'
                                }}
                            >
                                Primary Focus: {iconLabels[mentor.profile_icon_id]}
                            </Tag>
                        </div>
                    )}
                </div>
                
                {/* Basic User Info Section */}
                <section>
                    <Title level={4} style={{ color: '#6B21A8' }}>Basic Information</Title>
                    {user && (
                        <>
                            {editingUser ? (
                                <UserProfileForm 
                                    user={user}
                                    industriesOptions={industriesOptions}
                                    onSuccess={handleUserProfileSuccess}
                                    onCancel={() => setEditingUser(false)}
                                />
                            ) : (
                                <>
                                    <ProfileSection label="Name">
                                        {user.name}
                                    </ProfileSection>
                                    <ProfileSection label="Email">
                                        {user.email}
                                    </ProfileSection>
                                    <ProfileSection label="Location">
                                        {user?.location || 'Not specified'}
                                    </ProfileSection>
                                    <ProfileSection label="About Me">
                                        {user?.blurb || 'No bio provided yet.'}
                                    </ProfileSection>
                                    <ProfileSection label="Industries">
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {user.industries?.length > 0 ? (
                                                user.industries.map((industry, index) => (
                                                    <Tag
                                                        key={index}
                                                        style={{ padding: '4px 12px', background: '#DDD6FE', color: '#6B21A8' }}
                                                    >
                                                        {typeof industry === 'string' ? industry : industry.name}
                                                    </Tag>
                                                ))
                                            ) : (
                                                'No industries specified'
                                            )}
                                        </div>
                                    </ProfileSection>
                                    <div style={{ marginTop: '16px', marginBottom: '32px' }}>
                                        <Button type="primary" onClick={() => setEditingUser(true)}>
                                            Edit Basic Information
                                        </Button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </section>
                
                <Divider style={{ margin: '32px 0', borderColor: '#C4B5FD' }} />
                
                {/* Mentor Profile Section */}
                <section>
                    <Title level={4} style={{ color: '#6B21A8' }}>Peer Expert Profile</Title>
                    <p>Share your expertise with others in the South African startup community.</p>
                    
                    {mentor ? (
                        <>
                            {editingMentor ? (
                                <MentorSignupForm
                                    mentor={mentor}
                                    onSuccess={(updatedMentor) => {
                                        setMentor(updatedMentor);
                                        setEditingMentor(false);
                                        // Update profile picture if icon changed
                                        if (updatedMentor.profile_icon_id) {
                                            setProfilePicture(getProfileIcon(updatedMentor.profile_icon_id));
                                        }
                                    }}
                                />
                            ) : (
                                <>
                                    <ProfileSection label="Mentor Name">
                                        {mentor.name}
                                    </ProfileSection>
                                    <ProfileSection label="Primary Focus">
                                        {mentor.profile_icon_id ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <img 
                                                    src={getProfileIcon(mentor.profile_icon_id)}
                                                    alt={iconLabels[mentor.profile_icon_id]}
                                                    style={{ width: '36px', height: '36px', borderRadius: '50%' }}
                                                />
                                                <span>{iconLabels[mentor.profile_icon_id]}</span>
                                            </div>
                                        ) : (
                                            'Not specified'
                                        )}
                                    </ProfileSection>
                                    <ProfileSection label="Contact Info">
                                        {mentor.contact_info}
                                    </ProfileSection>
                                    <ProfileSection label="LinkedIn">
                                        <Link href={mentor.linkedin} target="_blank">LinkedIn profile</Link>
                                    </ProfileSection>
                                    <ProfileSection label="Expertise">
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {mentor.expertises?.length > 0 ? (
                                                mentor.expertises.map((expertise, index) => (
                                                    <Tag
                                                        key={index}
                                                        style={{ padding: '4px 12px', background: '#DDD6FE', color: '#6B21A8' }}
                                                    >
                                                        {typeof expertise === 'string' ? expertise : expertise.name}
                                                    </Tag>
                                                ))
                                            ) : (
                                                'No expertise specified'
                                            )}
                                        </div>
                                    </ProfileSection>
                                    <ProfileSection label="Looking For Help With">
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {mentor.mentor_needs?.length > 0 ? (
                                                mentor.mentor_needs.map((mentorNeed, index) => (
                                                    <Tag
                                                        key={index}
                                                        style={{ padding: '4px 12px', background: '#DDD6FE', color: '#6B21A8' }}
                                                    >
                                                        {typeof mentorNeed === 'string' ? mentorNeed : mentorNeed.name}
                                                    </Tag>
                                                ))
                                            ) : (
                                                'No needs specified'
                                            )}
                                        </div>
                                    </ProfileSection>
                                    <div style={{ marginTop: '16px' }}>
                                        <Button type="primary" onClick={() => setEditingMentor(true)}>
                                            Edit Mentor Profile
                                        </Button>
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <p>You haven't set up your mentor profile yet. Sign up to offer your expertise.</p>
                            <MentorSignupForm 
                                onSuccess={(newMentor) => {
                                    setMentor(newMentor);
                                    // Update profile picture if icon selected
                                    if (newMentor.profile_icon_id) {
                                        setProfilePicture(getProfileIcon(newMentor.profile_icon_id));
                                    }
                                }} 
                            />
                        </>
                    )}
                </section>
            </Card>
        </Layout>
    );
};

export default Profile;