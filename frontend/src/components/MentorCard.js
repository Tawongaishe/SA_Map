// src/components/MentorCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './MentorCard.css';  // Add CSS for styling

const MentorCard = ({ mentor }) => {
    return (
        <div className="mentor-card">
            <h3>{mentor.name}</h3>
            
            <p><strong>Expertise:</strong></p>
            <div className="expertise-list">
                {mentor.expertises && mentor.expertises.length > 0 ? (
                    mentor.expertises.map((exp, index) => (
                        <span key={index} className="expertise-tag">
                            {typeof exp === 'string' ? exp : exp.name || 'Unnamed'}
                        </span>
                    ))
                ) : (
                    <p>No expertise listed.</p>
                )}
            </div>

            <p><strong>Contact Info:</strong> {mentor.contact_info}</p>
            
            <Link to={`/mentors/${mentor.id}`} className="view-profile-button">
                View Profile
            </Link>

            {/* Add CSS for styling */}
            <style jsx>{`
                .mentor-card {
                    padding: 1.5rem;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    background-color: #fff;
                    margin-bottom: 1rem;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .expertise-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                }
                .expertise-tag {
                    padding: 0.4rem 0.8rem;
                    background-color: #0073e6;
                    color: white;
                    border-radius: 12px;
                    font-size: 0.9rem;
                    font-weight: 500;
                    text-align: center;
                }
                .view-profile-button {
                    display: inline-block;
                    margin-top: 1rem;
                    padding: 0.5rem 1rem;
                    background-color: #0073e6;
                    color: white;
                    text-decoration: none;
                    border-radius: 4px;
                    text-align: center;
                    font-weight: 600;
                }
                .view-profile-button:hover {
                    background-color: #005bb5;
                }
            `}</style>
        </div>
    );
};

export default MentorCard;
