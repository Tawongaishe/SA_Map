import React, { useState, useEffect } from 'react';
import { Row, Col, Empty, Typography } from 'antd';
import MentorCard from '../components/MentorCard';
import MentorHero from '../components/MentorHero';
import MentorMatchesSection from '../components/MatchSection';

const { Title } = Typography;

const MentorPage = () => {
    const [mentors, setMentors] = useState([]);
    const [filteredMentors, setFilteredMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedExpertise, setSelectedExpertise] = useState('all');
    const [userData, setUserData] = useState({id: localStorage.getItem('user_id')});

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await fetch(`/api/mentors`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch mentors');
                }

                const mentorsData = await response.json();
                setMentors(mentorsData);
                setFilteredMentors(mentorsData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching mentors:', err);
                setError('Failed to load mentors data.');
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    const getAllExpertises = () => {
        const expertiseSet = new Set();
        mentors.forEach(mentor => {
            mentor.expertises?.forEach(exp => {
                expertiseSet.add(typeof exp === 'string' ? exp : exp.name);
            });
        });
        return Array.from(expertiseSet);
    };

    
const filterMentors = (search, expertise) => {
    let filtered = mentors;

    // Filter by search term
    if (search) {
        filtered = filtered.filter(mentor =>
            mentor.name.toLowerCase().includes(search.toLowerCase()) ||
            mentor.location?.toLowerCase().includes(search.toLowerCase())
        );
    }

    // Filter by expertise
    if (expertise && expertise !== 'all') {
        filtered = filtered.filter(mentor =>
            mentor.expertises?.some(exp => {
                const expertiseName = typeof exp === 'string' ? exp : exp.name;
                return expertiseName === expertise;
            })
        );
    }

    setFilteredMentors(filtered);
};

    const handleSearch = (value) => {
        setSearchTerm(value);
        filterMentors(value, selectedExpertise);
    };

    const handleExpertiseFilter = (value) => {
        setSelectedExpertise(value);
        filterMentors(searchTerm, value);
    };

    return (
        <div style={{ background: '#EDE9FE', margin: '0px' }}>
            <MentorHero 
                onSearch={handleSearch}
                onExpertiseChange={handleExpertiseFilter}
                expertiseOptions={getAllExpertises()}
            />

            <MentorMatchesSection userData={userData} />  

            <div style={{ marginBottom: '48px', maxWidth: '1200px', margin: '0 auto'}}>
                <Title level={2} style={{ 
                    marginBottom: '24px',
                    color: '#1a1a1a',
                    fontSize: '24px',
                    fontWeight: 600,
                    marginLeft: '2rem'
                }}>
                    Peer Experts
                </Title>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 2rem' }}>
                    <Row gutter={[24, 24]}>
                        {filteredMentors.map((mentor) => (
                            <Col xs={24} sm={12} lg={8} key={mentor.id}>
                                <MentorCard mentor={mentor} />
                            </Col>
                        ))}
                    </Row>

                    {filteredMentors.length === 0 && (
                        <Empty description="No mentors found matching your criteria" />
                    )}
                </div>
            </div>            
        </div>
    );
};

export default MentorPage;