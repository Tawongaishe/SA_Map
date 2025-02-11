import React from 'react';
import { Row, Col, Button, Typography, Space, Card, Statistic } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const HomeHero = () => {
    const stats = [
        { number: '500+', label: 'Active Startups' },
        { number: '50+', label: 'Peer Experts' },
        { number: '20+', label: 'Local Communities' },
        { number: '100+', label: 'Curated Resources' }
    ];

    return (
        <div style={{
            background: 'linear-gradient(135deg, #4C1D95 0%, #5B21B6 50%, #F97316 100%)',
            padding: '6rem 2rem',
            width: '100%',
            marginBottom: '2rem'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Row gutter={[48, 48]} align="middle">
                    <Col xs={24} md={14}>
                        <Title level={1} style={{ 
                            color: 'white', 
                            fontSize: '4rem',
                            fontWeight: '800',
                            lineHeight: '1.1',
                            marginBottom: '1.5rem'
                        }}>
                            South African Startup Space
                        </Title>
                        <Paragraph style={{ 
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '1.25rem',
                            marginBottom: '2rem',
                            maxWidth: '600px'
                        }}>
                            Find startup programs, join active communities, and connect with other founders who can help you grow.
                        </Paragraph>
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            <Space direction="vertical" size="middle">
                                <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: '12px' }}>📚</span>
                                    Discover local startup resources, programs, and opportunities
                                </Text>
                                <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: '12px' }}>🤝</span>
                                    Connect with peers who share knowledge while seeking yours
                                </Text>
                                <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: '12px' }}>🌍</span>
                                    Join South Africa's richest startup community
                                </Text>
                            </Space>
                            <Link to="/mentors">
                                <Button 
                                    type="primary" 
                                    size="large"
                                    icon={<ArrowRightOutlined />}
                                    style={{
                                        background: '#F97316',
                                        border: 'none',
                                        height: '48px',
                                        padding: '0 2rem',
                                        fontSize: '1.125rem',
                                        borderRadius: '8px',
                                        marginTop: '1rem'
                                    }}
                                >
                                    Find Peers
                                </Button>
                            </Link>
                        </Space>
                    </Col>
                    <Col xs={24} md={10}>
                        <Card style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            border: 'none',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <Title level={3} style={{ color: 'white', marginBottom: '1.5rem' }}>
                                Community Impact
                            </Title>
                            <Row gutter={[16, 24]}>
                                {stats.map((stat, index) => (
                                    <Col span={12} key={index}>
                                        <Statistic 
                                            value={stat.number}
                                            title={stat.label}
                                            valueStyle={{ 
                                                color: 'white', 
                                                fontSize: '2rem', 
                                                fontWeight: 'bold' 
                                            }}
                                            titleStyle={{
                                                color: 'rgba(255, 255, 255, 0.8)'
                                            }}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default HomeHero;