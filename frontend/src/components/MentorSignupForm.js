import React, { useState, useEffect } from 'react';

const MentorSignupForm = ({ mentor, expertiseOptions, onSave, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        contact_info: '',
    });
    const [selectedExpertiseIds, setSelectedExpertiseIds] = useState([]);
    //const [selectedNeedIds, setSelectedNeedIds] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (mentor) {
        console.log('Mentor:', mentor);
        console.log('Mentor Expertises:', mentor.expertises);
        console.log('Mentor Needs:', mentor.needs);
            setFormData({
                name: mentor.name || '',
                contact_info: mentor.contact_info || '',
            });
            setSelectedExpertiseIds(mentor.expertises ? mentor.expertises.map(e => e.id) : []);
            //setSelectedNeedIds(mentor.needs ? mentor.needs.map(e => e.id) : []);
        }
    }, [mentor]);

    const handleAddExpertise = (id) => {
        if (!selectedExpertiseIds.includes(id)) {
            setSelectedExpertiseIds([...selectedExpertiseIds, id]);
        }
    };

    const handleRemoveExpertise = (id) => {
        setSelectedExpertiseIds(selectedExpertiseIds.filter((expId) => expId !== id));
    };

    // const handleAddNeed = (id) => {
    //     if (!selectedNeedIds.includes(id)) {
    //         setSelectedNeedIds([...selectedNeedIds, id]);
    //     }
    // };

    // const handleRemoveNeed = (id) => {
    //     setSelectedNeedIds(selectedNeedIds.filter((needId) => needId !== id));
    // };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            // Replace this with the actual API endpoint
            const response = await fetch(`/mentors/${mentor ? 'me' : ''}`, {
                method: mentor ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    expertise_ids: selectedExpertiseIds,
                    //needs: selectedNeedIds,
                }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to save mentor profile.');
            }

            const savedMentor = await response.json();
            if (onSuccess) onSuccess(savedMentor); // Callback to parent
        } catch (err) {
            console.error('Error submitting form:', err);
            setError('An error occurred while saving your profile. Please try again.');
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            {error && <p className="error">{error}</p>}
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>
            <div>
                <label>Contact Info:</label>
                <input
                    type="text"
                    value={formData.contact_info}
                    onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                />
            </div>
            <div>
                <label>Expertises:</label>
                <ul>
                    {expertiseOptions.map((expertise) => (
                        <li key={expertise.id}>
                            <input
                                type="checkbox"
                                checked={selectedExpertiseIds.includes(expertise.id)}
                                onChange={(e) =>
                                    e.target.checked
                                        ? handleAddExpertise(expertise.id)
                                        : handleRemoveExpertise(expertise.id)
                                }
                            />
                            {expertise.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {/* <label>Needs:</label>
                <ul>
                    {expertiseOptions.map((expertise) => (
                        <li key={expertise.id}>
                            <input
                                type="checkbox"
                                checked={selectedNeedIds.includes(expertise.id)}
                                onChange={(e) =>
                                    e.target.checked
                                        ? handleAddNeed(expertise.id)
                                        : handleRemoveNeed(expertise.id)
                                }
                            />
                            {expertise.name}
                        </li>
                    ))}
                </ul> */}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default MentorSignupForm;
