// src/components/StartupList.js
import React from 'react';
import './StartupList.css';  // You can also create a specific CSS file for this component if needed

const StartupList = ({ startups }) => {
    if (!startups.length) {
        return <p>No startups found.</p>;
    }

    return (
        <ul className="startup-list">
            {startups.map((startup) => (
                <li key={startup.id}>
                    <article>
                        <header>
                            <strong>{startup.name}</strong>
                        </header>
                        <p className="startup-industry">{startup.industry}</p>
                        <p>{startup.location}</p>
                    </article>
                </li>
            ))}
        </ul>
    );
};

export default StartupList;
