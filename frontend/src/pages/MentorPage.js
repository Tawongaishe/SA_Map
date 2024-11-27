import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd'; // Import Ant Design grid components
import MentorCard from '../components/MentorCard';

const MentorPage = () => {
    const [mentors, setMentors] = useState([]); // Store list of all mentors
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(''); // Store error messages

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                // Fetch list of all mentors
                const mentorsResponse = await fetch(`/mentors`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                if (!mentorsResponse.ok) {
                    throw new Error('Failed to fetch mentors');
                }

                const mentorsData = await mentorsResponse.json();
                setMentors(mentorsData);
                setLoading(false); // Turn off loading state
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
        <div style={{ padding: '20px' }}>
            <h2>Find Mentors 👩🏾‍💼</h2>
            <p style={{ marginBottom: '20px' }}>Here are all the mentors available to help you.</p>

            <Row gutter={[16, 16]} justify="center"> {/* Grid layout */}
                {mentors.map((mentor) => (
                    <Col
                        key={mentor.id}
                        xs={24} // Full width on small screens
                        sm={12} // Two cards per row on medium screens
                        lg={8} // Three cards per row on large screens
                    >
                        <MentorCard mentor={mentor} /> {/* Render MentorCard */}
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default MentorPage;
