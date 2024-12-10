import React, { useState, useEffect } from 'react';
import StartupList from '../components/StartupList';
import StartupCommunities from '../components/StartupCommunities';
import StartupFinalists from '../components/StartupFinalists';
import StartupPrograms from '../components/StartupPrograms';
import './Profile.css';
import { Layout, Spin, Typography } from 'antd';

const { Content } = Layout;
const { Title, Text } = Typography;

const HomePage = () => {
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState('finalists');

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection(sectionId);
    };

    useEffect(() => {
        const fetchStartups = async () => {
            try {
                const response = await fetch('/api/startups', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache'
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
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
        <Layout className="profile-page" style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
            <div style={{ 
                position: 'sticky', 
                top: 0, 
                zIndex: 1, 
                width: '100%',
                backgroundColor: '#f0f2f5',
                padding: '12px 0'
            }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    gap: '32px',
                    fontSize: '16px',
                    maxWidth: 1200,
                    margin: '0 auto'
                }}>
                    {[
                        { key: 'finalists', label: 'Award Finalists' },
                        { key: 'communities', label: 'Communities' },
                        { key: 'programs', label: 'Programs' },
                        { key: 'browse', label: 'Browse All' }
                    ].map((item) => (
                        <a
                            key={item.key}
                            onClick={() => scrollToSection(item.key)}
                            style={{
                                cursor: 'pointer',
                                color: activeSection === item.key ? '#1890ff' : '#595959',
                                borderBottom: activeSection === item.key ? '2px solid #1890ff' : '2px solid transparent',
                                paddingBottom: '4px',
                                transition: 'all 0.3s'
                            }}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>

            <Content style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
                {/* <Title level={1}>South African Startup Ecosystem 🇿🇦</Title> */}
                
                <div id="finalists">
                    <StartupFinalists />
                </div>

                <div id="communities">
                    <StartupCommunities />
                </div>

                <div id="programs">
                    <StartupPrograms />
                </div>

                <div id="browse" style={{ marginTop: 24 }}>
                    <Title level={2}>
                        <span role="img" aria-label="search">🔍</span> Browse All Startups
                    </Title>
                    {error && <Text type="danger">Error: {error}</Text>}
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '24px' }}>
                            <Spin size="large" />
                        </div>
                    ) : startups.length > 0 ? (
                        <StartupList startups={startups} />
                    ) : (
                        <Text>No startups found</Text>
                    )}
                </div>
            </Content>
        </Layout>
    );
};

export default HomePage;