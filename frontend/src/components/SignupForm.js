// src/components/SignupForm.js
import React, { useState, useEffect } from 'react';

const SignupForm = ({ onSignup }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [blurb, setBlurb] = useState('');
    const [industriesOptions, setIndustriesOptions] = useState([]); // Store available industries
    const [selectedIndustryIds, setSelectedIndustryIds] = useState([]); // Store selected industry IDs

    // Fetch industries from backend
    useEffect(() => {
        const fetchIndustries = async () => {
            try {
                const response = await fetch('/users/industries', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
                if (response.ok) {
                    const industries = await response.json();
                    setIndustriesOptions(industries);
                } else {
                    console.error('Failed to fetch industries');
                }
            } catch (error) {
                console.error('Error fetching industries:', error);
            }
        };

        fetchIndustries();
    }, []);

    const handleAddIndustry = (id) => {
        if (!selectedIndustryIds.includes(id)) setSelectedIndustryIds([...selectedIndustryIds, id]);
    };

    const handleRemoveIndustry = (id) => {
        setSelectedIndustryIds(selectedIndustryIds.filter((industryId) => industryId !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const signupData = { name, email, password, location, blurb, industries: selectedIndustryIds };

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupData),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user_id', data.session);  // Store the user ID
                onSignup();  // Notify parent component that signup was successful
            } else {
                alert('Signup failed');
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
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
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Location:</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div>
                <label>About Me:</label>
                <textarea
                    value={blurb}
                    onChange={(e) => setBlurb(e.target.value)}
                />
            </div>
            <div>
                <label>Industries:</label>
                <div className="industry-selection">
                    {industriesOptions.map((industry) => (
                        <button
                            type="button"
                            key={industry.id}
                            onClick={() => handleAddIndustry(industry.id)}
                            disabled={selectedIndustryIds.includes(industry.id)}
                            className={`industry-option ${selectedIndustryIds.includes(industry.id) ? 'selected' : ''}`}
                        >
                            {industry.name}
                        </button>
                    ))}
                </div>
                <div className="selected-industries">
                    {selectedIndustryIds.map((id) => {
                        const industry = industriesOptions.find((ind) => ind.id === id);
                        return (
                            <span key={id} className="industry-tag">
                                {industry?.name}
                                <button type="button" onClick={() => handleRemoveIndustry(id)}>x</button>
                            </span>
                        );
                    })}
                </div>
            </div>
            <button type="submit">Sign Up</button>

            <style jsx>{`
                .industry-selection {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                }
                .industry-option {
                    padding: 0.4rem 0.8rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    cursor: pointer;
                    background-color: #f5f5f5;
                }
                .industry-option.selected {
                    background-color: #0073e6;
                    color: white;
                }
                .selected-industries {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                .industry-tag {
                    background-color: #e0e0e0;
                    padding: 0.3rem 0.7rem;
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                }
                .industry-tag button {
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

export default SignupForm;
