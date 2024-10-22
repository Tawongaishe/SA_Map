// src/components/MentorForm.js
import React, { useState } from 'react';

const MentorForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [expertise, setExpertise] = useState('');
    const [contactInfo, setContactInfo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const mentorData = { name, expertise, contact_info: contactInfo };
        onSubmit(mentorData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Expertise:</label>
                <input
                    type="text"
                    value={expertise}
                    onChange={(e) => setExpertise(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Contact Info:</label>
                <input
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default MentorForm;
