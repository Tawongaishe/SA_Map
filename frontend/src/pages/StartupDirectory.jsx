import React, { useState, useEffect } from 'react';
import StartupFinalists from '../components/StartupFinalists';
import { Layout, Spin, Divider, Typography } from 'antd';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const StartupDirectory = () => {
  

  return (
    <Layout style={{ backgroundColor: '#EDE9FE', margin: '0' }}>
      <Content style={{ 
        padding: '24px', 
        maxWidth: 1200, 
        margin: '0 auto',
        backgroundColor: 'transparent'
      }}>
        <div className="page-header" style={{ marginBottom: 40, padding: '40px 20px' }}>
          <Title level={1} style={{ color: '#6b21a8', textAlign: 'center' }}>
            South African Startup Directory
          </Title>
          <Paragraph style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            Explore our comprehensive collection of innovative South African startups 
            making an impact across various industries.
          </Paragraph>
        </div>
        
        <section style={{ marginBottom: 60 }}>
          {/* Use the StartupFinalists component but with a prop to show all startups */}
          <StartupFinalists showAllStartups={true} />
        </section>
        
        <Divider style={{ margin: '60px 0' }} />
        
      </Content>
    </Layout>
  );
};

export default StartupDirectory;