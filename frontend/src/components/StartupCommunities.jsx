import React from 'react';
import { Card, Row, Col, Typography, Tag, Space, Button } from 'antd';
import { GlobalOutlined, LinkedinFilled } from '@ant-design/icons';

const { Title, Text, Link, Paragraph } = Typography;

const StartupCommunities = () => {
  const communities = [
    {
      name: "Zatech",
      description: "One of South Africa's largest tech communities, focusing on connecting tech professionals, sharing job opportunities, and fostering collaboration.",
      members: "20K+",
      website: "https://zatech.co.za",
      linkedin: "https://www.linkedin.com/company/zatech-community/"
    },
    {
      name: "StartupClubZA",
      description: "Premier startup community fostering innovation and growth through events, mentorship, and networking opportunities.",
      members: "5K+",
      website: "https://startupclubza.com",
      linkedin: "https://www.linkedin.com/company/startupclubza/"
    },
    {
      name: "Silicon Cape",
      description: "Non-profit enabling and connecting tech entrepreneurs in the Western Cape ecosystem through events and resources.",
      members: "15K+",
      website: "https://siliconcape.com",
      linkedin: "https://www.linkedin.com/company/silicon-cape/"
    },
    {
      name: "Future Females",
      description: "Global community supporting female entrepreneurs through education, resources, and networking.",
      members: "100K+",
      website: "https://futurefemales.co",
      linkedin: "https://www.linkedin.com/company/future-females/"
    },
    {
      name: "Heavy Chef",
      description: "Platform for entrepreneurs to learn from other entrepreneurs through events and workshops.",
      members: "25K+",
      website: "https://heavychef.com",
      linkedin: "https://www.linkedin.com/company/heavy-chef/"
    },
    {
      name: "Startup Grind Cape Town",
      description: "Local chapter of global startup community, hosting regular events and fireside chats with successful entrepreneurs.",
      members: "8K+",
      website: "https://www.startupgrind.com/cape-town/",
      linkedin: "https://www.linkedin.com/company/startup-grind-cape-town/"
    }
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title 
            level={2}
            style={{ 
              color: '#595959',
              marginBottom: 16,
              fontSize: '28px',
              fontWeight: 600
            }}
          >
            South Africa's Thriving Tech Communities
          </Title>
          <Text style={{ color: '#8c8c8c', fontSize: '16px' }}>
            Discover the vibrant networks and communities that are shaping South Africa's tech landscape, 
            from developer meetups to startup support groups.
          </Text>
        </div>
        
        <Row gutter={[16, 16]}>
          {communities.map((community) => (
            <Col xs={24} md={12} key={community.name}>
              <Card hoverable>
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <Title level={4} style={{ marginBottom: 8 }}>{community.name}</Title>
                  <Paragraph style={{ marginBottom: 16 }}>{community.description}</Paragraph>
                  
                  <Space size="middle">
                    <Tag color="blue">{community.members} members</Tag>
                    <Space size="small">
                      <Button 
                        type="text" 
                        icon={<GlobalOutlined />}
                        href={community.website}
                        target="_blank"
                        style={{ padding: 4 }}
                      />
                      <Button 
                        type="text" 
                        icon={<LinkedinFilled />}
                        href={community.linkedin}
                        target="_blank"
                        style={{ padding: 4 }}
                      />
                    </Space>
                  </Space>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </div>
  );
};

export default StartupCommunities;