// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [mentor, setMentor] = useState(null);  // Store logged-in mentor's profile
    const [editing, setEditing] = useState(false);  // Track editing mode
    const [adding, setAdding] = useState(false);  // Track adding mode
    const [formData, setFormData] = useState({  // Form state for adding or editing mentor
        name: '',
        expertise: '',
        contact_info: ''
    });
    const [error, setError] = useState('');  // Store error messages
    const navigate = useNavigate();

    // Fetch logged-in user's mentor profile on mount
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
                    setFormData({
                        name: data.name,
                        expertise: data.expertise,
                        contact_info: data.contact_info
                    });
                }
            } catch (err) {
                console.error('Error fetching mentor profile:', err);
                setError('Failed to load profile data.');
            }
        };

        fetchMentorProfile();
    }, []);

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/mentors/me`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to update mentor profile');
            }

            setMentor(formData);  // Update the local state
            setEditing(false);  // Exit editing mode
        } catch (err) {
            console.error('Error updating mentor profile:', err);
            setError('Could not update mentor profile.');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/mentors/${mentor.id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to delete mentor profile');
            }

            setMentor(null);  // Clear mentor data after deletion
        } catch (err) {
            console.error('Error deleting mentor profile:', err);
            setError('Could not delete mentor profile.');
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/mentors`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to add mentor profile');
            }

            const data = await response.json();
            setMentor(data);  // Update with the new mentor profile
            setAdding(false);  // Exit adding mode
        } catch (err) {
            console.error('Error adding mentor profile:', err);
            setError('Could not add mentor profile.');
        }
    };

    const handleLogout = async () => {
        try {
            // Make a request to the backend logout route
            const response = await fetch('/logout', {
                method: 'GET',
                credentials: 'include',  // Include cookies (for session)
            });
    
            if (response.ok) {
                // If logout is successful, remove user ID from local storage
                localStorage.removeItem('user_id');
    
                // Redirect to the home page or another public view where login/signup is shown
                navigate('/');  // Redirect to the public home page
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div>
            <h1>Profile Page</h1>
            <button onClick={handleLogout}>Logout</button>

            {mentor ? (
                editing ? (
                    <form onSubmit={handleEditSubmit}>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>Expertise:</label>
                            <input
                                type="text"
                                value={formData.expertise}
                                onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>Contact Info:</label>
                            <input
                                type="text"
                                value={formData.contact_info}
                                onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setEditing(false)}>Cancel</button>
                    </form>
                ) : (
                    <div>
                        <h2>{mentor.name}'s Profile</h2>
                        <p><strong>Expertise:</strong> {mentor.expertise}</p>
                        <p><strong>Contact Info:</strong> {mentor.contact_info}</p>
                        <button onClick={() => setEditing(true)}>Edit</button>
                        <button onClick={handleDelete}>Delete Profile</button>
                    </div>
                )
            ) : (
                adding ? (
                    <form onSubmit={handleAddSubmit}>
                        <h2>Add Yourself as a Mentor</h2>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>Expertise:</label>
                            <input
                                type="text"
                                value={formData.expertise}
                                onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>Contact Info:</label>
                            <input
                                type="text"
                                value={formData.contact_info}
                                onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit">Submit</button>
                        <button type="button" onClick={() => setAdding(false)}>Cancel</button>
                    </form>
                ) : (
                    <div>
                        <p>No mentor profile found. Add yourself as a mentor!</p>
                        <button onClick={() => setAdding(true)}>Add Mentor Profile</button>
                    </div>
                )
            )}
        </div>
    );
};

export default Profile;
