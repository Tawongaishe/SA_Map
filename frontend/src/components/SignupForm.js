// src/components/SignupForm.js
import React, { useState, useEffect } from 'react';
import './SignupForm.css';

const SignupForm = ({ onSignup }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [blurb, setBlurb] = useState('');
    const [industriesOptions, setIndustriesOptions] = useState([]);
    const [selectedIndustryIds, setSelectedIndustryIds] = useState([]);

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
                localStorage.setItem('user_id', data.session);
                onSignup();
            } else {
                alert('Signup failed');
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Sign Up</h2>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>About Me:</label>
                    <textarea value={blurb} onChange={(e) => setBlurb(e.target.value)} />
                </div>
                <div className="form-group">
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
                <button type="submit" className="submit-button">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;
