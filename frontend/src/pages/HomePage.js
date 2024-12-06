import React, { useState, useEffect } from 'react';
import StartupList from '../components/StartupList';
import './Profile.css';

import React, { useState, useEffect } from 'react';

const HomePage = () => {
    console.log('Component rendering');

    useEffect(() => {
        console.log('useEffect running');
        alert('useEffect is running');
    }, []);

    return (
        <div>
            <h2>Browse Startups 🔍</h2>
            <p>Test Page</p>
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