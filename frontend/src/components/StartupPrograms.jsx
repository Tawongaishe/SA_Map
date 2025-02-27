// StartupPrograms.jsx
import React from 'react';
import { Card, Row, Col, Typography, Tag } from 'antd';

const { Title, Text } = Typography;

const StartupPrograms = () => {
  const programs = [
    {
      name: "Startup School South Africa",
      type: "Incubator",
      duration: "12 weeks",
      url: "https://startupschool.ac/"
    },
    {
      name: "Google for Startups - Africa",
      type: "Accelerator",
      duration: "3 months",
      url: "https://startup.google.com/programs/accelerator/africa/"
    },
    {
      name: "AlphaCode Incubate",
      type: "Fintech Incubator",
      duration: "6 months",
      url: "https://www.alphacodevp.com/"
    },
    {
      name: "Grindstone Accelerator",
      type: "Scale-up Program",
      duration: "12 months",
      url: "https://www.grindstonexl.com/"
    }
  ];

  // Function to handle card click
  const handleCardClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <Title level={2}
        style={{ color: '#6B21A8' }} >
        <span role="img" aria-label="school"></span> Startup Programs
      </Title>
      <div style = { { marginBottom: 24 } }>
        <Text style={{ color: '#8c8c8c', fontSize: '16px' }}>
              We all need support to grow. Check out these programs that provide mentorship, funding, and resources to help startups succeed.
            </Text>
       </div>
      
      <Row gutter={[16, 16]}>
        {programs.map((program) => (
          <Col xs={24} md={12} key={program.name}>
            <Card 
              hoverable
              onClick={() => handleCardClick(program.url)}
              style={{ cursor: 'pointer' }}
            >
              <Title level={4}>{program.name}</Title>
              <div style={{ marginTop: 12 }}>
                <Tag color="green">{program.type}</Tag>
                <Tag color="blue">{program.duration}</Tag>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StartupPrograms;