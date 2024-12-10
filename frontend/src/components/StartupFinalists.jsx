import React, { useState } from 'react';
import { Card, Row, Col, Typography, Space, Button } from 'antd';
import { LinkedinFilled, DownOutlined} from '@ant-design/icons';

const { Title, Text, Link } = Typography;

const StartupFinalists = () => {
    const [visible, setVisible] = useState(8)
  const finalists = [
    {
      name: "Adbot",
      linkedin: "https://www.linkedin.com/company/adbot-ai/"
    },
    {
      name: "Mergemega",
      linkedin: "https://www.linkedin.com/company/mergemega/"
    },
    {
      name: "BioCertica",
      linkedin: "https://www.linkedin.com/company/biocertica/"
    },
    {
      name: "MariHealth Solutions®",
      linkedin: "https://www.linkedin.com/company/marihealth/"
    },
    {
      name: "Plentify",
      linkedin: "https://www.linkedin.com/company/plentify/"
    },
    {
      name: "Plant the Seed",
      linkedin: "https://www.linkedin.com/company/plant-the-seed-sa/"
    },
    {
      name: "Buzzer - Community Safety App",
      linkedin: "https://www.linkedin.com/company/buzzer-app/"
    },
    {
      name: "Enhle Flora",
      linkedin: "https://www.linkedin.com/company/enhle-flora/"
    },
    {
      name: "Conservio",
      linkedin: "https://www.linkedin.com/company/conservio/"
    },
    {
      name: "KasiD Pty Ltd",
      linkedin: "https://www.linkedin.com/company/kasid/"
    },
    {
      name: "Rekisa eCommerce Solutions",
      linkedin: "https://www.linkedin.com/company/rekisa/"
    },
    {
      name: "Keller Education",
      linkedin: "https://www.linkedin.com/company/keller-education/"
    },
    {
      name: "Limu Lab",
      linkedin: "https://www.linkedin.com/company/limu-lab/"
    },
    {
      name: "Zaio Institute of Technology",
      linkedin: "https://www.linkedin.com/company/zaio/"
    },
    {
      name: "LeaseSurance",
      linkedin: "https://www.linkedin.com/company/leasesurance/"
    },
    {
      name: "Crayon",
      linkedin: "https://www.linkedin.com/company/crayon-south-africa/"
    },
    {
      name: "Jobox",
      linkedin: "https://www.linkedin.com/company/jobox-africa/"
    },
    {
      name: "ServCraft",
      linkedin: "https://www.linkedin.com/company/servcraft/"
    },
    {
      name: "Engage Mx",
      linkedin: "https://www.linkedin.com/company/engage-mx/"
    },
    {
      name: "Mia Healthcare",
      linkedin: "https://www.linkedin.com/company/mia-healthcare/"
    },
    {
      name: "Welo Health",
      linkedin: "https://www.linkedin.com/company/welo-health/"
    },
    {
      name: "Sellers Plug",
      linkedin: "https://www.linkedin.com/company/sellers-plug/"
    },
    {
      name: "Tributree",
      linkedin: "https://www.linkedin.com/company/tributree/"
    },
    {
      name: "Eagle Eye Defence",
      linkedin: "https://www.linkedin.com/company/eagle-eye-defence/"
    },
    {
      name: "Smartee - IES",
      linkedin: "https://www.linkedin.com/company/smartee-ies/"
    },
    {
      name: "Zimi Charge",
      linkedin: "https://www.linkedin.com/company/zimi-charge/"
    },
    {
      name: "Fuel Switch",
      linkedin: "https://www.linkedin.com/company/fuelswitch/"
    }
  ];
  const showMore = () => {
    setVisible(prev => prev + 4); // Show 8 more items when button is clicked
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={2}
          style={{ 
            color: '#595959',
            marginBottom: 16,
            fontSize: '28px',
            fontWeight: 600}}>
            <span role="img" aria-label="trophy">🏆</span> 27 South African Startups Shine in 2024 Awards 
          </Title>
          <Text>
            Check out these outstanding South African startups that made it to{' '}
            <Link href="https://startupclubza.com/" target="_blank" rel="noopener noreferrer">
              Startup Club ZA's
            </Link>
            {' '}cohort of finalists for their startup awards. These companies represent various 
            sectors of innovation in the South African startup ecosystem.
          </Text>
        </div>
        
        <Row gutter={[16, 16]}>
          {finalists.slice(0, visible).map((finalist) => (
            <Col xs={24} sm={12} md={8} lg={6} key={finalist.name}>
              <Card
                hoverable
                size="small"
                style={{ height: '100%' }}
                bodyStyle={{ 
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Text strong style={{ marginBottom: 4, display: 'block' }}>
                  {finalist.name}
                </Text>
                <a
                  href={finalist.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#0077B5',
                    fontSize: '16px'
                  }}
                >
                  <LinkedinFilled />
                </a>
              </Card>
            </Col>
          ))}
        </Row>

        {visible < finalists.length && (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
             <Button 
              type="text"
              onClick={showMore}
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 auto',
                color: '#595959',
                fontSize: '14px'
              }}
              icon={<DownOutlined style={{ fontSize: '12px' }} />}
            >see more</Button>
          </div>
        )}
      </Space>
    </div>
  );
};

export default StartupFinalists;