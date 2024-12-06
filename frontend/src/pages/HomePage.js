import React, { useState, useEffect } from 'react';
import StartupList from '../components/StartupList';
import './Profile.css';


const HomePage = () => {
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStartups = async () => {
            try {
                console.log('Fetching startups...');
                // Using relative path instead of full URL
                const response = await fetch('/api/startups', {
                    headers: {
                        'Content-Type': 'application/json',
                        // Add cache control to prevent caching
                        'Cache-Control': 'no-cache'
                    }
                });
                
                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Data received:', data);
                setStartups(data);
            } catch (error) {
                console.error('Error fetching startups:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStartups();
    }, []);

    return (
        <div className="profile-page">
            <h2>Browse Startups 🔍</h2>
            <p className="intro-text">Here are some of the startups in South Africa.</p>
            {error && <p style={{color: 'red'}}>Error: {error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : startups.length > 0 ? (
                <StartupList startups={startups} />
            ) : (
                <p>No startups found</p>
            )}
        </div>
    );
};

export default HomePage;
// const HomePage = () => {
//     const [startups, setStartups] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         console.log('Starting fetch...'); // Add this log

//         const fetchStartups = async () => {
//             try {
//                 const response = await fetch('/api/startups', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });

//                 // Log the raw response for debugging
//                 console.log('Response status:', response.status);
                
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
                
//                 const data = await response.json();
//                 console.log('Received data:', data); // Log the received data
//                 setStartups(data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Detailed error:', error);
//                 setError(error.message);
//                 setLoading(false);
//             }
//         };

//         fetchStartups();
//     }, []);

//     if (error) {
//         return <div className="profile-page">
//             <h2>Browse Startups 🔍</h2>
//             <p className="error-message">Error loading startups: {error}</p>
//         </div>;
//     }

//     return (
//         <div className="profile-page">
//             <h2>Browse Startups 🔍</h2>
//             <p className="intro-text">Here are some of the startups in South Africa.</p>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : startups.length > 0 ? (
//                 <StartupList startups={startups} />
//             ) : (
//                 <p>No startups found.</p>
//             )}
//         </div>
//     );
// };

// export default HomePage;