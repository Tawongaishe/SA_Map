// src/pages/MentorPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './OneMentorPage.css';

const OneMentorPage = () => {
    const { mentorId } = useParams();
    const [mentorData, setMentorData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMentorData = async () => {
            try {
                const response = await fetch(`/mentors/${mentorId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });
                if (!response.ok) throw new Error('Failed to fetch mentor data');
                const data = await response.json();
                setMentorData(data);
            } catch (err) {
                console.error('Error loading mentor data:', err);
                setError('Could not load profile data.');
            }
        };

        fetchMentorData();
    }, [mentorId]);

    return (
        <div className="mentor-page">
            <h1>Mentor Profile</h1>
            {error && <p className="error">{error}</p>}
            {mentorData && (
                <>
                    {/* Mentor Section */}
                    <div className="mentor-section">
                        <h2>{mentorData.mentor.name}</h2>
                        <p><strong>Call Me:</strong> {mentorData.user.name}</p>
                        <p><strong>A Little About Me:</strong> {mentorData.user.blurb || 'Nothing much for now!'}</p>
                        <p><strong>My Expertise:</strong></p>
                        <div className="expertise-list">
                            {mentorData.mentor.expertises.length > 0 ? mentorData.mentor.expertises.map((expertise, index) => (
                                <span key={index} className="expertise-tag">{expertise}</span>
                            )) : <p>No expertise listed.</p>}
                        </div>
                        <p><strong>My Industries:</strong></p>
                        <div className="industry-list">
                            { mentorData.user.industries.length > 0 ? mentorData.user.industries.map((industry, index) => (
                                <span key={index} className="industry-tag">{industry}</span>
                            )) : <p>No industries listed.</p>} 
                        </div>
                        <p><strong>Contact Info:</strong> {mentorData.mentor.contact_info}</p>
                        <p><strong>Location:</strong> {mentorData.user.location || 'N/A'}</p>
                    </div>
                </>
            )}

            {/* Styling for Mentor Page */}
            <style jsx>{`
                .mentor-page {
                    padding: 1.5rem;
                    max-width: 800px;
                    margin: 0 auto;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .expertise-list, .industry-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                }
                .expertise-tag, .industry-tag {
                    padding: 0.4rem 0.8rem;
                    background-color: #0073e6;
                    color: white;
                    border-radius: 12px;
                    font-size: 0.9rem;
                    font-weight: 500;
                    text-align: center;
                }
                .mentor-section, .user-section {
                    margin-top: 1.5rem;
                }
                .error {
                    color: red;
                    font-weight: bold;
                    margin-bottom: 1rem;
                }
            `}</style>
        </div>
    );
};

export default OneMentorPage;
