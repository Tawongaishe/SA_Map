// src/components/MentorList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MentorList = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await fetch('/mentors', {  
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'  
                });
                const data = await response.json();
                setMentors(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching mentors:', error);
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    if (loading) {
        return <p>Loading mentors...</p>;
    }

    return (
        <div>
            <h2>Mentor List</h2>
            <ul>
                {mentors.map((mentor) => (
                    <li key={mentor.id}>
                        <Link to={`/mentors/${mentor.id}`}>
                            {mentor.name} - {mentor.expertise}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MentorList;
