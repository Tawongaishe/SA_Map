// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import StartupList from '../components/StartupList';
import './Profile.css';

const HomePage = () => {
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStartups = async () => {
            try {
                const response = await fetch('/startups');
                const data = await response.json();
                setStartups(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching startups:', error);
                setLoading(false);
            }
        };

        fetchStartups();
    }, []);

    return (
        <div className = 'profile-page'>
            <h2>Browse Startups 🔍 </h2>
            <p className = 'intro-text'>Here are some of the startups in South Africa.</p>
            {loading ? <p>Loading...</p> : <StartupList startups={startups} />}
        </div>
    );
};

export default HomePage;
