// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import MentorSignupForm from '../components/MentorSignupForm';
import './Profile.css';

const Profile = ({ setIsAuthenticated }) => {
    const [mentor, setMentor] = useState(null);
    const [user, setUser] = useState(null);
    const [industriesOptions, setIndustriesOptions] = useState([]);
    const [selectedIndustryIds, setSelectedIndustryIds] = useState([]);
    const [error, setError] = useState('');
    const [editingUser, setEditingUser] = useState(false);
    const [editingMentor, setEditingMentor] = useState(false);
    const [showUserProfile, setShowUserProfile] = useState(true);
    const [showMentorProfile, setShowMentorProfile] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const mentorResponse = await fetch(`/mentors/me`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include' });
                if (mentorResponse.status === 404) setMentor(null);
                else if (!mentorResponse.ok) throw new Error('Failed to fetch mentor profile');
                else setMentor(await mentorResponse.json());

                const userResponse = await fetch(`/users/me`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include' });
                if (!userResponse.ok) throw new Error('Failed to fetch user data');
                else {
                    const userData = await userResponse.json();
                    setUser(userData);
                    setSelectedIndustryIds(
                        userData.industries
                            ? userData.industries.map(industry => (typeof industry === 'string' ? industry : industry.id))
                            : []
                    );
                }

                

                const industriesResponse = await fetch(`/users/industries`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include' });
                if (!industriesResponse.ok) throw new Error('Failed to fetch industries');
                else setIndustriesOptions(await industriesResponse.json());
            } catch (err) {
                console.error('Error fetching profile data:', err);
                setError('Failed to load profile data.');
            }
        };
        fetchProfileData();
    }, []);

    const handleAddIndustry = (id) => {
        if (!selectedIndustryIds.includes(id)) setSelectedIndustryIds([...selectedIndustryIds, id]);
    };

    const handleRemoveIndustry = (id) => {
        setSelectedIndustryIds(selectedIndustryIds.filter((industryId) => industryId !== id));
    };

    const toggleEditUserMode = () => setEditingUser(!editingUser);
    const toggleEditMentorMode = () => setEditingMentor(!editingMentor);

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
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Failed to save changes');
            const updatedUser = await response.json();
            setUser(updatedUser);
            setEditingUser(false);
        } catch (err) {
            console.error('Error saving changes:', err);
            setError('Failed to save changes.');
        }
    };

    const deleteMentorProfile = async () => {
        try {
            const response = await fetch(`/mentors/${mentor.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to delete mentor profile');
            setMentor(null);
        } catch (err) {
            console.error('Error deleting mentor profile:', err);
            setError('Failed to delete mentor profile.');
        }
    };

    return (
        <div className="profile-page">
            <h2>Profile Page 👤</h2>
            {error && <p className="error">{error}</p>}

            <p className="intro-text">Welcome! This is your profile page where you can manage your User Profile and Mentor Profile.</p>

            {/* User Profile Section */}
            <div className="profile-section">
                <h2 onClick={() => setShowUserProfile(!showUserProfile)} className="toggle-header">
                    User Profile <span className="toggle-icon">{showUserProfile ? '▲' : '▼'}</span>
                </h2>
                {showUserProfile && user && (
                    <div>
                        <p><strong>Location:</strong> {editingUser ? (
                            <input
                                type="text"
                                value={user.location || ''}
                                onChange={(e) => setUser({ ...user, location: e.target.value })}
                            />
                        ) : user.location || 'N/A'}</p>
                        
                        <p><strong>About Me:</strong> {editingUser ? (
                            <textarea
                                value={user.blurb || ''}
                                onChange={(e) => setUser({ ...user, blurb: e.target.value })}
                            />
                        ) : user.blurb || 'N/A'}</p>

                        <p><strong>Industries:</strong></p>
                        <div className="selected-industries">
                            {user.industries.map((industry, index) => (
                                <span key={index} className="pill">
                                    {typeof industry === 'string' ? industry : industry.name}
                                    {editingUser && (
                                        <button onClick={() => handleRemoveIndustry(industry.id || industry)}>x</button>
                                    )}
                                </span>
                            ))}
                        </div>

                        {editingUser && (
                            <div className="industry-selection">
                                {industriesOptions.map((industry) => (
                                    <button
                                        key={industry.id}
                                        onClick={() => handleAddIndustry(industry.id)}
                                        disabled={selectedIndustryIds.includes(industry.id)}
                                        className={`pill industry-option ${selectedIndustryIds.includes(industry.id) ? 'selected' : ''}`}
                                    >
                                        {industry.name}
                                    </button>
                                ))}
                            </div>
                        )}

                        <button className="action-button" onClick={toggleEditUserMode}>
                            {editingUser ? 'Cancel' : 'Edit User Profile'}
                        </button>
                        {editingUser && (
                            <button className="action-button save-button" onClick={handleSaveUserChanges}>Save Changes</button>
                        )}
                    </div>
                )}
            </div>

            {/* Mentor Profile Section */}
            <div className="profile-section">
                <h2 onClick={() => setShowMentorProfile(!showMentorProfile)} className="toggle-header">
                    Mentor Profile <span className="toggle-icon">{showMentorProfile ? '▲' : '▼'}</span>
                </h2>
                {showMentorProfile && mentor ? (
                    <div>
                        <p><strong>Name:</strong> {mentor.name}</p>
                        <p><strong>Contact Info:</strong> {mentor.contact_info}</p>
                        <p><strong>Expertise:</strong></p>
                        <div className="expertise-list">
                            {mentor.expertises.map((expertise, index) => (
                                <span key={index} className="pill">
                                    {typeof expertise === 'string' ? expertise : expertise.name || 'Unnamed'}
                                </span>
                            ))}
                        </div>
                         <div className="needs-list">
                            {mentor.needs.map((need, index) => (
                                <span key={index} className="pill">
                                    {typeof need === 'string' ? need : need.name || 'Unnamed'}
                                </span>
                            ))}
                        </div>
                        <button className="action-button" onClick={toggleEditMentorMode}>
                            {editingMentor ? 'Cancel' : 'Edit Mentor Profile'}
                        </button>
                        <button className="action-button delete-button" onClick={deleteMentorProfile}>Delete Mentor Profile</button>

                        {editingMentor && (
                            <MentorSignupForm
                                mentor={mentor}
                                onSuccess={(updatedMentor) => {
                                    setMentor(updatedMentor);
                                    setEditingMentor(false);
                                }}
                            />
                        )}
                    </div>
                ) : (
                    <div className="create-mentor-prompt">
                        <p>You don't have a mentor profile yet. Create one to connect with others as a mentor!</p>
                        <MentorSignupForm
                            onSuccess={(newMentor) => setMentor(newMentor)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
