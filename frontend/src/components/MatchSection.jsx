import React, { useState, useEffect } from 'react';
import { Card, Tag, Avatar, Typography, Row, Col } from 'antd';
import { UserOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const MatchCard = ({ match, matchType }) => {
    const MAX_TAGS = 3;
    const mentor = match.mentor;

    const renderExpertiseTags = (expertises) => {
        if (!expertises || expertises.length === 0) return null;
        
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {expertises.slice(0, MAX_TAGS).map((exp, index) => (
                    <Tag
                        key={index}
                        style={{
                            background: exp.type === 'L2' ? '#EEF2FF' : '#F0FDF4',
                            color: exp.type === 'L2' ? '#4F46E5' : '#166534',
                            border: 'none',
                            borderRadius: '16px',
                            padding: '4px 12px',
                            fontSize: '13px',
                            margin: 0
                        }}
                    >
                        {exp.expertise.name}
                    </Tag>
                ))}
                {expertises.length > MAX_TAGS && (
                    <Tag
                        style={{
                            background: '#F3F4F6',
                            color: '#6B7280',
                            border: 'none',
                            borderRadius: '16px',
                            padding: '4px 12px',
                            fontSize: '13px',
                            margin: 0
                        }}
                    >
                        +{expertises.length - MAX_TAGS} more
                    </Tag>
                )}
            </div>
        );
    };

    return (
        <Card
            bordered={false}
            style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                height: '100%',
                minHeight: '200px',
            }}
            hoverable
        >
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                {/* Header section */}
                <div style={{ display: "flex", alignItems: "start", gap: "16px", marginBottom: "16px" }}>
                    <Avatar
                        size={56}
                        icon={<UserOutlined />}
                        style={{
                            backgroundColor: '#f0f2f5',
                            border: '2px solid #ffffff',
                        }}
                    />
                    
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{
                                margin: 0,
                                fontSize: '18px',
                                fontWeight: 600,
                                color: '#1a1a1a',
                                marginBottom: '4px'
                            }}>
                                {mentor.name}
                            </h3>
                            {match.match_score && (
                                <Tag style={{
                                    background: '#EDE9FE',
                                    color: '#5B21B6',
                                    border: 'none',
                                    borderRadius: '16px',
                                }}>
                                    Match: {match.match_score}
                                </Tag>
                            )}
                        </div>
                        
                        {mentor.location && (
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                color: '#666666',
                                fontSize: '14px'
                            }}>
                                <EnvironmentOutlined style={{ marginRight: "6px", color: "#8c8c8c" }} />
                                <span>{mentor.location}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Expertise Matches */}
                {matchType === 'golden' && (
                    <>
                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
                                What you can offer:
                            </div>
                            {renderExpertiseTags(match.i_can_offer)}
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
                                What they can offer:
                            </div>
                            {renderExpertiseTags(match.they_can_offer)}
                        </div>
                    </>
                )}

                {matchType !== 'golden' && (
                    <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
                            Matching Expertise:
                        </div>
                        {renderExpertiseTags(match.matches)}
                    </div>
                )}

                {/* View Profile Link */}
                <div style={{ marginTop: 'auto' }}>
                    <Link to={`/mentors/${mentor.id}`} style={{ display: 'block' }}>
                        <button
                            style={{
                                width: '100%',
                                height: '40px',
                                background: 'transparent',
                                border: '1px solid #5B21B6',
                                color: '#5B21B6',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                transition: 'all 0.2s'
                            }}
                            className="hover:bg-purple-50"
                        >
                            View Profile
                        </button>
                    </Link>
                </div>
            </div>
        </Card>
    );
};

const MatchSection = ({ title, matches, matchType }) => {
    if (!matches || matches.length === 0) return null;

    return (
        <div style={{ marginBottom: '48px' }}>
            <Title level={2} style={{ 
                marginBottom: '24px',
                color: '#1a1a1a',
                fontSize: '24px',
                fontWeight: 600
            }}>
                {title}
            </Title>
            <Row gutter={[24, 24]}>
                {matches.map((match) => (
                    <Col xs={24} sm={12} lg={8} key={match.mentor.id}>
                        <MatchCard match={match} matchType={matchType} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

const MentorMatchesSection = ({ userData }) => {
    const [goldenMatches, setGoldenMatches] = useState([]);
    const [canHelpMe, setCanHelpMe] = useState([]);
    const [canHelp, setCanHelp] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            if (!userData?.id) return;

            try {
                const my_id = userData.id;
                const [goldenRes, canHelpMeRes, canHelpRes] = await Promise.all([
                    fetch(`/api/matches/golden/${my_id}`, {
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                    }),
                    fetch(`/api/matches/can-help-me/${my_id}`, {
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                    }),
                    fetch(`/api/matches/can-help/${my_id}`, {
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                    })
                ]);

                const [goldenData, canHelpMeData, canHelpData] = await Promise.all([
                    goldenRes.json(),
                    canHelpMeRes.json(),
                    canHelpRes.json()
                ]);

                setGoldenMatches(goldenData.matches);
                setCanHelpMe(canHelpMeData.matches);
                setCanHelp(canHelpData.matches);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching matches:', err);
                setError('Failed to load matches');
                setLoading(false);
            }
        };

        fetchMatches();
    }, [userData]);

    if (loading) {
        return (
            <div style={{ 
                textAlign: 'center', 
                padding: '32px', 
                color: '#6B7280',
                fontSize: '16px'
            }}>
                Loading matches...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ 
                textAlign: 'center', 
                padding: '32px', 
                color: '#DC2626',
                fontSize: '16px'
            }}>
                {error}
            </div>
        );
    }

    return (
        <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '32px 24px' 
        }}>
            <MatchSection 
                title="Perfect Matches" 
                matches={goldenMatches} 
                matchType="golden"
            />
            <MatchSection 
                title="Mentors Who Can Help You" 
                matches={canHelpMe}
                matchType="can-help-me"
            />
            <MatchSection 
                title="Mentors You Can Help" 
                matches={canHelp}
                matchType="can-help"
            />
        </div>
    );
};

export default MentorMatchesSection;