import React from 'react';
import { Row, Col, Input, Select, Typography, Space } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const EXPERTISE_CATEGORIES = {
    "Funding": ["Pre-Seed", "Seed", "Series A", "Series B", "Series C", "IPO", "Grants", "Crowdfunding"],
    "Marketing": ["Digital Marketing", "Social Media Strategy", "Content Marketing", "Influencer Marketing", "Paid Advertising", "Market Research"],
    "Networking": ["Event Networking", "Online Community Building", "Partnership Development", "Industry Networking"],
    "Legal and Governance": ["Intellectual Property (IP) Protection", "Contract Management", "Compliance", "Business Structure & Incorporation", "Government Relations"],
    "Staffing (Recruiting)": ["Talent Acquisition", "Employee Onboarding", "Human Resources (HR) Management", "Retention Strategies", "Diversity & Inclusion Hiring"],
    "Financial Management": ["Budgeting", "Cash Flow Management", "Accounting", "Tax Planning", "Financial Forecasting"],
    "Strategic Thinking and Planning": ["Vision & Mission Development", "Business Modeling", "Competitive Analysis", "Goal Setting", "Risk Management"],
};

const MentorHero = ({ onSearch, onExpertiseChange }) => {
    return (
        <div style={{
            background: 'linear-gradient(135deg, #4C1D95 0%, #5B21B6 50%, #F97316 100%)',
            padding: '6rem 2rem',
            width: '100%',
            marginBottom: '2rem'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Title level={1} style={{ 
                    color: 'white', 
                    fontSize: '3.5rem',
                    fontWeight: '800',
                    lineHeight: '1.2',
                    marginBottom: '1rem'
                }}>
                    Learn & Share<br />
                    with Peers
                </Title>
                <Paragraph style={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1.25rem',
                    maxWidth: '600px',
                    marginBottom: '2rem'
                }}>
                    Find peers who can help you grow, while you help them too.
                </Paragraph>

                <Space direction="vertical" size="large" style={{ width: '100%', marginBottom: '2rem' }}>
                    <Space direction="vertical" size="middle">
                        <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '12px' }}>🤝</span>
                            Share skills with peers who understand your journey
                        </Text>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '12px' }}>💡</span>
                            Match with peers based on complementary expertise
                        </Text>
    
                    </Space>
                </Space>

                <Row gutter={[16, 16]} style={{ maxWidth: '900px' }}>
                    <Col xs={24}>
                        
                    </Col>
                    <Col xs={24} md={16}>
                        <Search
                            placeholder="Search by name, location or expertise"
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={onSearch}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <Select
                            placeholder="Filter by expertise"
                            style={{ width: '100%' }}
                            size="large"
                            defaultValue="all"
                            onChange={onExpertiseChange}
                        >
                            <Select.Option value="all">All Expertise Areas</Select.Option>
                            {Object.entries(EXPERTISE_CATEGORIES).map(([category, expertises]) => (
                                <Select.OptGroup key={category} label={category}>
                                    {expertises.map(expertise => (
                                        <Select.Option key={expertise} value={expertise}>
                                            {expertise}
                                        </Select.Option>
                                    ))}
                                </Select.OptGroup>
                            ))}
                        </Select>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default MentorHero;