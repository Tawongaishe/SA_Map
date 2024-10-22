import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MentorProfile = () => {
    const [mentor, setMentor] = useState(null);  // Store logged-in mentor's profile
    const [mentors, setMentors] = useState([]);  // Store list of all mentors
    const [loading, setLoading] = useState(true);  // Track loading state
    const [editing, setEditing] = useState(false);  // Track editing mode
    const [formData, setFormData] = useState({  // Form state for editing or signing up
        name: '',
        expertise: '',
        contact_info: ''
    });
    const [error, setError] = useState('');  // Store error messages

    // Fetch the logged-in user's mentor profile and all mentors
    useEffect(() => {
        const fetchMentorData = async () => {
            try {
                // Fetch logged-in mentor's profile
                const mentorResponse = await fetch(`/mentors/me`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });

                if (mentorResponse.status === 404) {
                    // No mentor profile found
                    setMentor(null);
                } else if (!mentorResponse.ok) {
                    throw new Error('Failed to fetch mentor profile');
                } else {
                    const mentorData = await mentorResponse.json();
                    setMentor(mentorData);
                    setFormData({
                        name: mentorData.name,
                        expertise: mentorData.expertise,
                        contact_info: mentorData.contact_info
                    });
                }

                // Fetch list of all mentors
                const mentorsResponse = await fetch(`/mentors`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });

                if (!mentorsResponse.ok) {
                    throw new Error('Failed to fetch mentors');
                }

                const mentorsData = await mentorsResponse.json();
                setMentors(mentorsData);

                setLoading(false);  // Turn off loading state
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load mentor data.');
                setLoading(false);
            }
        };

        fetchMentorData();
    }, []);

    // Handle form submission for editing or signing up as a mentor
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(mentor ? `/mentors/me` : `/mentors`, {
                method: mentor ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to submit mentor profile');
            }

            const updatedMentor = await response.json();
            setMentor(updatedMentor);  // Update the local state
            setEditing(false);  // Exit editing mode
        } catch (err) {
            console.error('Error submitting mentor profile:', err);
            setError('Could not submit mentor profile.');
        }
    };

    // Handle delete action
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

    if (loading) return <p>Loading mentor data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Mentor Profile</h1>

            {mentor ? (
                editing ? (
                    <form onSubmit={handleFormSubmit}>
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
                        <h2>{mentor.name}</h2>
                        <p><strong>Expertise:</strong> {mentor.expertise}</p>
                        <p><strong>Contact Info:</strong> {mentor.contact_info}</p>
                        <button onClick={() => setEditing(true)}>Edit</button>
                        <button onClick={handleDelete}>Delete Profile</button>
                    </div>
                )
            ) : (
                <div>
                    <p>No mentor profile found. Sign up as a mentor!</p>
                    <form onSubmit={handleFormSubmit}>
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
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MentorProfile;
