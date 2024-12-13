// StartupPrograms.jsx
import React from 'react';
import { Card, Row, Col, Typography, Tag } from 'antd';

const { Title } = Typography;

const StartupPrograms = () => {
  const programs = [
    {
      name: "Startup School South Africa",
      type: "Incubator",
      duration: "12 weeks"
    },
    {
      name: "Google for Startups - Africa",
      type: "Accelerator",
      duration: "3 months"
    },
    {
      name: "AlphaCode Incubate",
      type: "Fintech Incubator",
      duration: "6 months"
    },
    {
      name: "Grindstone Accelerator",
      type: "Scale-up Program",
      duration: "12 months"
    }
  ];

  return (
    <div style={{ marginBottom: 24 }}>
      <Title level={2}
        style={{ color: '#6B21A8' }} >
        <span role="img" aria-label="school"></span> Startup Programs
      </Title>
      <Row gutter={[16, 16]}>
        {programs.map((program) => (
          <Col xs={24} md={12} key={program.name}>
            <Card hoverable>
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