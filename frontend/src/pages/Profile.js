// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import MentorSignupForm from '../components/MentorSignupForm';
import LogoutButton from '../components/LogoutButton';

const Profile = ({ setIsAuthenticated }) => {
    const [mentor, setMentor] = useState(null);
    const [error, setError] = useState('');
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchMentorProfile = async () => {
            try {
                const response = await fetch(`/mentors/me`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });

                if (response.status === 404) {
                    setMentor(null);  // No mentor profile found
                } else if (!response.ok) {
                    throw new Error('Failed to fetch mentor profile');
                } else {
                    const data = await response.json();
                    setMentor(data);
                }
            } catch (err) {
                console.error('Error fetching mentor profile:', err);
                setError('Failed to load profile data.');
            }
        };

        fetchMentorProfile();
    }, []);

    return (
        <div>
            <h1>Profile Page</h1>
            {error && <p className="error">{error}</p>}
            <LogoutButton setIsAuthenticated={setIsAuthenticated} />

            {mentor ? (
                <div>
                    <h2>{mentor.name}'s Profile</h2>
                    <p><strong>Expertise:</strong> {mentor.expertise}</p>
                    <p><strong>Contact Info:</strong> {mentor.contact_info}</p>
                    <button onClick={() => setEditing(true)}>Edit Profile</button>
                </div>
            ) : (
                <p>No mentor profile found. Please sign up below!</p>
            )}

            {(editing || !mentor) && (
                <MentorSignupForm
                    mentor={mentor}
                    onSuccess={(updatedMentor) => {
                        setMentor(updatedMentor);
                        setEditing(false);
                    }}
                />
            )}
        </div>
    );
};

export default Profile;
