import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const HomeHero = () => {
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
                            South African<br />
                            Startup Space
                        </Title>
                        <Paragraph style={{ 
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '1.25rem',
                            marginBottom: '2rem',
                            maxWidth: '600px'
                        }}>
                            Connect with mentors, join communities, and access resources to help your startup grow.
                        </Paragraph>
                        <Link to="/mentors">
                            <Button 
                                type="primary" 
                                size="large"
                                style={{
                                    background: '#F97316',
                                    border: 'none',
                                    height: '48px',
                                    padding: '0 2rem',
                                    fontSize: '1.125rem',
                                    borderRadius: '8px'
                                }}
                            >
                                Find a Mentor <ArrowRightOutlined />
                            </Button>
                        </Link>
                    </Col>
                    <Col xs={24} md={10}>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '2rem',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <Title level={3} style={{ color: 'white', marginBottom: '1rem' }}>
                                Quick Stats
                            </Title>
                            <Row gutter={[16, 16]}>
                                {[
                                    { number: '500+', label: 'Startups' },
                                    { number: '50+', label: 'Mentors' },
                                    { number: '20+', label: 'Communities' },
                                    { number: '100+', label: 'Resources' }
                                ].map((stat, index) => (
                                    <Col span={12} key={index}>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ 
                                                color: 'white', 
                                                fontSize: '2rem', 
                                                fontWeight: 'bold' 
                                            }}>
                                                {stat.number}
                                            </div>
                                            <div style={{ 
                                                color: 'rgba(255, 255, 255, 0.8)',
                                                fontSize: '0.875rem'
                                            }}>
                                                {stat.label}
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default HomeHero;