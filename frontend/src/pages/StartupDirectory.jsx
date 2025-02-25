import React, { useState, useEffect } from 'react';
import StartupFinalists from '../components/StartupFinalists';
import StartupList from '../components/StartupList';
import { Layout, Spin, Divider, Typography } from 'antd';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const StartupDirectory = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await fetch('/api/startups', {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setStartups(data);
      } catch (error) {
        console.error('Error fetching startups:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

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
        
        <section style={{ marginBottom: 60 }}>
          <Title level={2} style={{ marginBottom: 30, color: '#6b21a8' }}>
            Complete Startup List
          </Title>
          <Paragraph style={{ marginBottom: 30 }}>
            Browse through our comprehensive list of South African startups, organized alphabetically.
          </Paragraph>
          
          {error && <Text type="danger">Error: {error}</Text>}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '24px' }}>
              <Spin size="large" />
            </div>
          ) : startups.length > 0 ? (
            <StartupList startups={startups} />
          ) : (
            <Text>No startups found</Text>
          )}
        </section>
      </Content>
    </Layout>
  );
};

export default StartupDirectory;