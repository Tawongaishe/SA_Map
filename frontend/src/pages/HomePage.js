import React, { useState } from 'react';
import StartupCommunities from '../components/StartupCommunities';
import StartupPrograms from '../components/StartupPrograms';
import StartupSpotlight from '../components/StartupSpotlight';
import HomeHero from '../components/HomeHero';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

const HomePage = () => {
    const [activeSection, setActiveSection] = useState('finalists');

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection(sectionId);
    };

    return (
        <Layout style={{ backgroundColor: '#EDE9FE', margin: '0' }}>
            {/* Hero Section */}
            <HomeHero />

            {/* Navigation Bar */}
            <div style={{ 
                position: 'sticky', 
                top: 0, 
                zIndex: 1, 
                width: '100%',
                backgroundColor: '#EDE9FE',
                padding: '12px ',
            }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    gap: '26px',
                    fontSize: '16px',
                    maxWidth: 1200,
                    margin: '0 auto'
                }}>
                    {[
                        { key: 'finalists', label: 'Spotlight Startups' },
                        { key: 'communities', label: 'Communities' },
                        { key: 'programs', label: 'Programs' }
                    ].map((item) => (
                        <a
                            href="#"
                            key={item.key}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(item.key);
                            }}
                            style={{
                                cursor: 'pointer',
                                color: activeSection === item.key ? '#F97316' : '#4B5563',
                                borderBottom: activeSection === item.key ? '2px solid #F97316' : '2px solid transparent',
                                paddingBottom: '4px',
                                transition: 'all 0.3s',
                                fontWeight: activeSection === item.key ? '600' : '400'
                            }}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <Content style={{ 
                padding: '24px', 
                maxWidth: 1200, 
                margin: '0 auto',
                backgroundColor: 'transparent'
            }}>
                <div id="finalists">
                    <StartupSpotlight />
                </div>

                <div id="communities">
                    <StartupCommunities />
                </div>

                <div id="programs">
                    <StartupPrograms />
                </div>
            </Content>
        </Layout>
    );
};

export default HomePage;