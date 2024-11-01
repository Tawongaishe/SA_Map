// src/components/MentorSignupForm.js
// the edit functionality of the expertise form is still poor 
import React, { useState, useEffect } from 'react';

const MentorSignupForm = ({ mentor, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: mentor?.name || '',
        contact_info: mentor?.contact_info || ''
    });
    const [expertiseOptions, setExpertiseOptions] = useState([]);
    const [selectedExpertiseIds, setSelectedExpertiseIds] = useState(mentor?.expertises?.map(e => e.id) || []);

    // Fetch expertise options from backend
    useEffect(() => {
        const fetchExpertiseOptions = async () => {
            try {
                const response = await fetch('/expertise');
                const data = await response.json();
                setExpertiseOptions(data || []);
            } catch (err) {
                console.error("Failed to fetch expertise options:", err);
            }
        };

        fetchExpertiseOptions();
    }, []);

    // Sync selectedExpertiseIds with mentor data when mentor prop changes
    useEffect(() => {
        if (mentor) {
            setFormData({
                name: mentor.name,
                contact_info: mentor.contact_info,
            });
            setSelectedExpertiseIds(mentor.expertises ? mentor.expertises.map(e => e.id) : []);
        }
    }, [mentor]);

    // Handle adding an expertise by ID
    const handleAddExpertise = (id) => {
        if (!selectedExpertiseIds.includes(id)) {
            setSelectedExpertiseIds([...selectedExpertiseIds, id]);
        }
    };

    // Handle removing an expertise by ID
    const handleRemoveExpertise = (id) => {
        setSelectedExpertiseIds(selectedExpertiseIds.filter((expId) => expId !== id));
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const submitData = {
            ...formData,
            expertises: selectedExpertiseIds
        };
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
            onSuccess(updatedMentor);
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
                <div className="expertise-selection">
                    {expertiseOptions.map((option) => (
                        <button
                            type="button"
                            key={option.id}
                            className={`expertise-option ${selectedExpertiseIds.includes(option.id) ? 'selected' : ''}`}
                            onClick={() => handleAddExpertise(option.id)}
                            disabled={selectedExpertiseIds.includes(option.id)}
                        >
                            {option.name}
                        </button>
                    ))}
                </div>
                <div className="selected-expertise">
                    {selectedExpertiseIds.map((id) => {
                        const expertise = expertiseOptions.find((opt) => opt.id === id);
                        return (
                            <span key={id} className="expertise-tag">
                                {expertise?.name || 'Unnamed'}
                                <button type="button" onClick={() => handleRemoveExpertise(id)}>x</button>
                            </span>
                        );
                    })}
                </div>
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

            {/* Updated CSS styling */}
            <style jsx>{`
                .expertise-selection {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                    flex-wrap: wrap;
                }
                .expertise-option {
                    padding: 0.4rem 0.8rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .expertise-option.selected {
                    background-color: #0073e6;
                    color: white;
                }
                .selected-expertise-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                }
                .expertise-tag {
                    background-color: #e0e0e0;
                    padding: 0.3rem 0.7rem;
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .expertise-tag button {
                    margin-left: 0.5rem;
                    background: none;
                    border: none;
                    color: #ff0000;
                    cursor: pointer;
                }
            `}</style>
        </form>
    );
};

export default MentorSignupForm;
