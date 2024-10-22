// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import StartupList from '../components/StartupList';

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
        <div>
            <h2>South African Startup Map</h2>
            {loading ? <p>Loading...</p> : <StartupList startups={startups} />}
        </div>
    );
};

export default HomePage;
