import React from 'react';
import { Card, Row, Col, Typography, Button, Tag, Divider } from 'antd';
import { FireOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const StartupSpotlight = () => {
  const spotlightStartups = [
    {
      name: "LeaseSurance",
      description: "Innovative insurance platform that simplifies rental deposit insurance for tenants and landlords.",
      industry: "InsurTech",
      founded: "2020",
      location: "Johannesburg",
      highlight: "Secured R12M in venture funding",
      linkedin: "https://www.linkedin.com/company/leasesurance/",
      website: "https://leasesurance.co.za",
      imagePlaceholder: "/api/placeholder/400/200"
    },
    {
      name: "Sellers Plug",
      description: "A vendor management system used for ecommerce platforms to streamline supplier relationships.",
      industry: "eCommerce",
      founded: "2020",
      location: "Johannesburg",
      highlight: "R50M in transactions monthly",
      linkedin: "https://www.linkedin.com/company/sellers-plug/",
      website: "https://sellersplug.co.za",
      imagePlaceholder: "/api/placeholder/400/200"
    },
    {
      name: "Plentify",
      description: "Smart water heating technology that reduces energy costs while supporting South Africa's renewable energy transition.",
      industry: "CleanTech",
      founded: "2016",
      location: "Cape Town",
      highlight: "50,000+ homes equipped",
      linkedin: "https://www.linkedin.com/company/plentify/",
      website: "https://plentify.com",
      imagePlaceholder: "/api/placeholder/400/200"
    }
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <Title level={2}
        style={{ 
          color: '#6b21a8',
          marginBottom: 16,
          fontSize: '28px',
          fontWeight: 600
        }}>
        <span role="img" aria-label="spotlight"></span> Startup Spotlight
      </Title>
      <Paragraph style={{ marginBottom: 24 }}>
        Check out these outstanding South African startups making a significant impact in their industries.
      </Paragraph>
      
      <Row gutter={[24, 24]}>
        {spotlightStartups.map((startup) => (
          <Col xs={24} sm={8} key={startup.name}>
            <Card
              hoverable
              style={{ 
                height: '100%', 
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #f0f0f0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}
              cover={
                <div style={{
                  height: 200,
                  background: '#f0f0f0',
                  backgroundImage: `url(/api/placeholder/400/320)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}></div>
              }
              bodyStyle={{ padding: '24px' }}
            >
              <div>
                <Title level={4} style={{ marginBottom: 8, fontSize: '18px' }}>
                  {startup.name}
                </Title>
                <div style={{ marginBottom: 8 }}>
                  <Tag color="purple">{startup.industry}</Tag>
                  <Tag color="blue">{startup.location}</Tag>
                  <Tag color="cyan">Est. {startup.founded}</Tag>
                </div>
              </div>
              
              <Divider style={{ margin: '12px 0' }} />
              
              <Paragraph style={{ 
                marginBottom: 16,
                fontSize: '14px'
              }}>
                {startup.description}
              </Paragraph>
              
              <div style={{ 
                background: '#f9f0ff', 
                padding: '8px 12px', 
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <Text strong style={{ color: '#6b21a8' }}>
                  <FireOutlined style={{ marginRight: 8 }} />
                  {startup.highlight}
                </Text>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <a
                  href={startup.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#0077B5',
                    fontSize: '14px'
                  }}
                >
                  LinkedIn
                </a>
                <a
                  href={startup.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#6b21a8',
                    fontSize: '14px'
                  }}
                >
                  Website
                </a>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Link to="/startups">
          <Button 
            type="primary"
            style={{
              background: '#6b21a8',
              borderColor: '#6b21a8',
              height: '40px',
              paddingLeft: '24px',
              paddingRight: '24px'
            }}
          >
            View all startups
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default StartupSpotlight;