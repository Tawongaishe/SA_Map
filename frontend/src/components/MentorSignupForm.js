// src/components/MentorSignupForm.js
import React, { useState } from 'react';

const MentorSignupForm = ({ mentor, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: mentor?.name || '',
        expertise: mentor?.expertise || '',
        contact_info: mentor?.contact_info || ''
    });
    const [expertiseOptions] = useState([
        'Software Development', 'Data Science', 'Product Management', 'Design', 'Marketing'
    ]);
    const [customExpertise, setCustomExpertise] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const submitData = customExpertise ? { ...formData, expertise: customExpertise } : formData;
        const method = mentor ? 'PUT' : 'POST';
        const endpoint = mentor ? `/mentors/me` : `/mentors`;

        try {
            const response = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData),
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Failed to submit mentor profile');

            const updatedMentor = await response.json();
            onSuccess(updatedMentor);  // Notify parent of success
        } catch (err) {
            console.error('Error submitting mentor profile:', err);
        }
    };

    return (
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
                <select
                    value={formData.expertise}
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        if (selectedValue === 'Other') setCustomExpertise('');
                        setFormData({ ...formData, expertise: selectedValue });
                    }}
                >
                    {expertiseOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                    <option value="Other">Other</option>
                </select>
                {formData.expertise === 'Other' && (
                    <input
                        type="text"
                        placeholder="Enter your expertise"
                        value={customExpertise}
                        onChange={(e) => setCustomExpertise(e.target.value)}
                        required
                    />
                )}
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
            <button type="submit">{mentor ? 'Save Changes' : 'Sign Up'}</button>
        </form>
    );
};

export default MentorSignupForm;
