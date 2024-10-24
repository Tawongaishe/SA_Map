// src/pages/MentorPage.js
import React, { useState, useEffect } from 'react';
import MentorCard from '../components/MentorCard';  // Import the MentorCard component
import MentorProfile from '../components/MentorProfile';


const MentorPage = () => {
    const [mentors, setMentors] = useState([]);  // Store list of all mentors
    const [loading, setLoading] = useState(true);  // Track loading state
    const [error, setError] = useState('');  // Store error messages

    useEffect(() => {
        const fetchMentors = async () => {
            try {
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
                console.error('Error fetching mentors:', err);
                setError('Failed to load mentors data.');
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    if (loading) return <p>Loading mentors...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Mentorship Page</h1>
            <h2>All Mentors</h2>
            <div className="mentor-list">
                {mentors.map((mentor) => (
                    <MentorCard key={mentor.id} mentor={mentor} />  // Use MentorCard for each mentor
                ))}
            </div>
            <MentorProfile />  
        </div>
    );
};

export default MentorPage;
