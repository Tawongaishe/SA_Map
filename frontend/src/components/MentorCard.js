// src/components/MentorCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './MentorCard.css';  // Add CSS for styling

const MentorCard = ({ mentor }) => {
    return (
        <div className="mentor-card">
            <h3>{mentor.name}</h3>
            <p><strong>Expertise:</strong> {mentor.expertise}</p>
            <p><strong>Contact Info:</strong> {mentor.contact_info}</p>
            <Link to={`/mentors/${mentor.id}`} className="view-profile-button">
                View Profile
            </Link>
        </div>
    );
};

export default MentorCard;
