// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import MentorSignupForm from '../components/MentorSignupForm';
import LogoutButton from '../components/LogoutButton';

const Profile = ({ setIsAuthenticated }) => {
    const [mentor, setMentor] = useState(null);
    const [user, setUser] = useState(null);
    const [industriesOptions, setIndustriesOptions] = useState([]); // Store industries
    const [selectedIndustryIds, setSelectedIndustryIds] = useState([]);
    const [error, setError] = useState('');
    const [editingUser, setEditingUser] = useState(false);
    const [editingMentor, setEditingMentor] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const mentorResponse = await fetch(`/mentors/me`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include' });
                if (mentorResponse.status === 404) setMentor(null); 
                else if (!mentorResponse.ok) throw new Error('Failed to fetch mentor profile');
                else {
                    const mentorData = await mentorResponse.json();
                    setMentor(mentorData);
                }

                const userResponse = await fetch(`/users/me`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include' });
                if (!userResponse.ok) throw new Error('Failed to fetch user data');
                else {
                    const userData = await userResponse.json();
                    setUser(userData);
                    setSelectedIndustryIds(userData.industries.map(industry => typeof industry === 'string' ? industry : industry.id));
                }

                const industriesResponse = await fetch(`/users/industries`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include' });
                if (!industriesResponse.ok) throw new Error('Failed to fetch industries');
                else {
                    const industriesData = await industriesResponse.json();
                    setIndustriesOptions(industriesData);
                }

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

    return (
        <div>
            <h1>Profile Page</h1>
            {error && <p className="error">{error}</p>}
            <LogoutButton setIsAuthenticated={setIsAuthenticated} />

            {/* User Profile Section */}
            <div>
                <h2>User Profile</h2>
                {user && (
                    <>
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
                            {user.industries.map((industry, index) => {
                                const industryName = typeof industry === 'string' ? industry : industry.name;
                                return (
                                    <span key={index} className="industry-tag">
                                        {industryName || 'Unnamed'}
                                        {editingUser && (
                                            <button onClick={() => handleRemoveIndustry(industry.id || industry)}>x</button>
                                        )}
                                    </span>
                                );
                            })}
                        </div>

                        {editingUser && (
                            <div className="industry-selection">
                                {industriesOptions.map((industry) => (
                                    <button
                                        key={industry.id}
                                        onClick={() => handleAddIndustry(industry.id)}
                                        disabled={selectedIndustryIds.includes(industry.id)}
                                        className={`industry-option ${selectedIndustryIds.includes(industry.id) ? 'selected' : ''}`}
                                    >
                                        {industry.name}
                                    </button>
                                ))}
                            </div>
                        )}

                        <button onClick={toggleEditUserMode}>
                            {editingUser ? 'Cancel' : 'Edit User Profile'}
                        </button>
                        {editingUser && (
                            <button onClick={handleSaveUserChanges}>Save Changes</button>
                        )}
                    </>
                )}
            </div>

            {/* Mentor Profile Section */}
            <div>
                <h2>Mentor Profile</h2>
                {mentor ? (
                    <>
                        <p><strong>Name:</strong> {mentor.name}</p>
                        <p><strong>Contact Info:</strong> {mentor.contact_info}</p>
                        <p><strong>Expertise:</strong></p>
                        <div className="expertise-list">
                            {mentor.expertises.map((expertise, index) => (
                                <span key={index} className="expertise-tag">
                                    {typeof expertise === 'string' ? expertise : expertise.name || 'Unnamed'}
                                </span>
                            ))}
                        </div>

                        <button onClick={toggleEditMentorMode}>
                            {editingMentor ? 'Cancel' : 'Edit Mentor Profile'}
                        </button>

                        {editingMentor && (
                            <MentorSignupForm
                                mentor={mentor}
                                onSuccess={(updatedMentor) => {
                                    setMentor(updatedMentor);
                                    setEditingMentor(false);
                                }}
                            />
                        )}
                    </>
                ) : (
                    <MentorSignupForm
                        onSuccess={(newMentor) => setMentor(newMentor)}
                    />
                )}
            </div>

            {/* Improved Styling for Readability */}
            <style jsx>{`
                .industry-selection, .expertise-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                }
                .industry-option, .expertise-tag, .industry-tag {
                    padding: 0.6rem 1.2rem;
                    border: 1px solid #ccc;
                    border-radius: 20px;
                    font-size: 1rem;
                    line-height: 1.5;
                    cursor: pointer;
                    background-color: #f5f5f5;
                    color: #333;
                    text-align: center;
                }
                .industry-option.selected, .expertise-tag {
                    background-color: #0073e6;
                    color: white;
                }
                .selected-industries {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                    margin-top: 0.5rem;
                }
                .industry-tag {
                    background-color: #e0e0e0;
                    color: #333;
                    display: inline-flex;
                    align-items: center;
                }
                .industry-tag button {
                    margin-left: 0.5rem;
                    background: none;
                    border: none;
                    color: #ff0000;
                    font-size: 1.1rem;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default Profile;
