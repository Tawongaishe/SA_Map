import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Space, Carousel, Tag, Divider, Button } from 'antd';
import { FireOutlined, GlobalOutlined, LinkedinOutlined, FileExcelOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph, Link } = Typography;

const StartupFinalists = () => {
  const finalists = [
    {
      name: "Mergemega",
      description: "Digital platform streamlining business compliance and company registration processes for South African entrepreneurs.",
      industry: "LegalTech",
      founded: "2020",
      location: "Johannesburg",
      highlight: "10,000+ businesses served",
      linkedin: "https://www.linkedin.com/company/mergemega/",
      website: "https://mergemega.com"
    },
    {
      name: "BioCertica",
      description: "Pioneering DNA health testing in Africa, making personalized healthcare more accessible and affordable.",
      industry: "Biotech",
      founded: "2018",
      location: "Cape Town",
      highlight: "Raised R5M in seed funding",
      linkedin: "https://www.linkedin.com/company/biocertica/",
      website: "https://biocertica.com"
    },
    {
      name: "MariHealth Solutions®",
      description: "Creating affordable diagnostic tools focusing on maternal and child health in underserved communities.",
      industry: "HealthTech",
      founded: "2019",
      location: "Johannesburg",
      highlight: "Winner of WHO Innovation Challenge",
      linkedin: "https://www.linkedin.com/company/marihealth-solutions/",
      website: "https://marihealth.co.za"
    },
    {
      name: "Plentify",
      description: "Smart water heating technology that reduces energy costs while supporting South Africa's renewable energy transition.",
      industry: "CleanTech",
      founded: "2016",
      location: "Cape Town",
      highlight: "50,000+ homes equipped",
      linkedin: "https://www.linkedin.com/company/plentify/",
      website: "https://plentify.com"
    },
    {
      name: "Plant the Seed",
      description: "Educational technology focused on early childhood development through innovative learning methodologies.",
      industry: "EdTech",
      founded: "2018",
      location: "Cape Town",
      highlight: "Reaching 10,000+ children",
      linkedin: "https://www.linkedin.com/company/plant-the-seed-education/",
      website: "https://planttheseed.co.za"
    },
    {
      name: "Buzzer - Community Safety App",
      description: "Mobile safety solution that connects communities and emergency services for faster response times.",
      industry: "SafetyTech",
      founded: "2017",
      location: "Pretoria",
      highlight: "200+ communities protected",
      linkedin: "https://buzzer-app.co.za/",
      website: "https://buzzer-app.co.za"
    },
    {
      name: "Enhle Flora",
      description: "Sustainable agriculture startup specializing in indigenous plants and traditional medicinal herbs.",
      industry: "AgriTech",
      founded: "2019",
      location: "Bloemfontein",
      highlight: "Exporting to 12 countries",
      linkedin: "https://www.enhleflora.co.za/",
      website: "https://www.enhleflora.co.za"
    },
    {
      name: "Conservio",
      description: "Leveraging technology for wildlife conservation efforts and sustainable environmental management.",
      industry: "ConservationTech",
      founded: "2019",
      location: "Cape Town",
      highlight: "Protected 50,000+ hectares",
      linkedin: "https://www.linkedin.com/company/conservio/",
      website: "https://conservio.co.za"
    },
    {
      name: "KasiD Pty Ltd",
      description: "Digital solutions designed specifically for township economies to enable local business growth.",
      industry: "FinTech",
      founded: "2018",
      location: "Soweto",
      highlight: "Supporting 500+ township businesses",
      linkedin: "https://www.linkedin.com/company/kasid/",
      website: "https://kasid.co.za"
    },
    {
      name: "Rekisa eCommerce Solutions",
      description: "Tailored e-commerce platform helping small businesses transition to online retail with minimal barriers.",
      industry: "eCommerce",
      founded: "2019",
      location: "Johannesburg",
      highlight: "700+ merchants onboarded",
      linkedin: "https://www.rekisa.co.za/",
      website: "https://www.rekisa.co.za"
    },
    {
      name: "Keller Education",
      description: "Revolutionizing education with personalized learning paths and critical thinking skills development.",
      industry: "EdTech",
      founded: "2017",
      location: "Cape Town",
      highlight: "Improving outcomes for 5,000+ students",
      linkedin: "https://www.linkedin.com/company/kellerthinking/",
      website: "https://kellereducation.co.za"
    },
    {
      name: "Limu Lab",
      description: "Innovative biotech company researching algae-based solutions for sustainable food production and biofuels.",
      industry: "Biotech",
      founded: "2018",
      location: "Stellenbosch",
      highlight: "3 patents pending for algae technologies",
      linkedin: "https://www.linkedin.com/company/limu-lab/",
      website: "https://limulab.co.za"
    },
    {
      name: "Zaio Institute of Technology",
      description: "Tech education platform teaching coding skills and connecting junior developers with job opportunities.",
      industry: "EdTech",
      founded: "2017",
      location: "Cape Town",
      highlight: "5,000+ developers trained",
      linkedin: "https://www.zaio.io/",
      website: "https://www.zaio.io"
    },
    {
      name: "LeaseSurance",
      description: "Innovative insurance platform that simplifies rental deposit insurance for tenants and landlords.",
      industry: "InsurTech",
      founded: "2020",
      location: "Johannesburg",
      highlight: "Secured R12M in venture funding",
      linkedin: "https://www.linkedin.com/company/leasesurance/",
      website: "https://leasesurance.co.za"
    },
    {
      name: "Crayon",
      description: "Digital transformation consultancy helping organizations optimize their IT infrastructure and software assets.",
      industry: "IT Services",
      founded: "2015",
      location: "Johannesburg",
      highlight: "Supporting 100+ enterprise clients",
      linkedin: "https://www.crayon.com/za/",
      website: "https://www.crayon.com/za"
    },
    {
      name: "Jobox",
      description: "Pan-African job marketplace connecting employers with skilled professionals across the continent.",
      industry: "JobTech",
      founded: "2018",
      location: "Cape Town",
      highlight: "Over 25,000 successful placements",
      linkedin: "https://www.jobboxafrica.com/",
      website: "https://www.jobboxafrica.com"
    },
    {
      name: "ServCraft",
      description: "Service delivery platform using AI to optimize field service operations for businesses.",
      industry: "ServiceTech",
      founded: "2019",
      location: "Durban",
      highlight: "Reducing service times by 40%",
      linkedin: "https://www.linkedin.com/company/servcraft/",
      website: "https://servcraft.co.za"
    },
    {
      name: "Engage Mx",
      description: "Marketing engagement platform helping brands create interactive customer experiences.",
      industry: "MarTech",
      founded: "2017",
      location: "Pretoria",
      highlight: "Serving top 50 SA retail brands",
      linkedin: "https://www.engagemx.co.za/",
      website: "https://www.engagemx.co.za"
    },
    {
      name: "Mia Healthcare",
      description: "Healthcare platform providing accessible primary care services through digital channels.",
      industry: "HealthTech",
      founded: "2019",
      location: "Cape Town",
      highlight: "100,000+ virtual consultations",
      linkedin: "https://www.miahealthcare.co.za/",
      website: "https://www.miahealthcare.co.za"
    },
    {
      name: "Welo Health",
      description: "Digital health platform providing affordable telemedicine services to rural communities.",
      industry: "HealthTech",
      founded: "2021",
      location: "Durban",
      highlight: "30,000+ consultations delivered",
      linkedin: "https://www.linkedin.com/company/welo-health/",
      website: "https://welohealth.co.za"
    },
    {
      name: "Sellers Plug",
      description: "Vendor management system for ecommerce platforms to streamline supplier relationships.",
      industry: "eCommerce",
      founded: "2020",
      location: "Johannesburg",
      highlight: "Processing R50M in transactions monthly",
      linkedin: "https://www.linkedin.com/company/sellers-plug/",
      website: "https://sellersplug.co.za"
    },
    {
      name: "Tributree",
      description: "Tax management software simplifying compliance for small businesses and entrepreneurs.",
      industry: "FinTech",
      founded: "2019",
      location: "Cape Town",
      highlight: "Saved clients R20M in tax preparation",
      linkedin: "https://www.linkedin.com/company/tributree/",
      website: "https://tributree.co.za"
    },
    {
      name: "Eagle Eye Defence",
      description: "Advanced surveillance and security systems for both commercial and residential applications.",
      industry: "SecurityTech",
      founded: "2018",
      location: "Pretoria",
      highlight: "Protecting 150+ high-security sites",
      linkedin: "https://www.linkedin.com/company/eagle-eye-defence/",
      website: "https://eagleeye.co.za"
    },
    {
      name: "Smartee - IES",
      description: "IoT solutions for intelligent energy management in commercial and industrial buildings.",
      industry: "IoT",
      founded: "2017",
      location: "Johannesburg",
      highlight: "Reducing energy costs by 35%",
      linkedin: "https://www.linkedin.com/company/smartee-ies/",
      website: "https://smartee.co.za"
    },
    {
      name: "Zimi Charge",
      description: "Electric vehicle charging infrastructure network expanding across South Africa.",
      industry: "CleanTech",
      founded: "2019",
      location: "Cape Town",
      highlight: "100+ charging stations nationwide",
      linkedin: "https://www.linkedin.com/company/zimicharge/",
      website: "https://zimicharge.co.za"
    },
    {
      name: "Fuel Switch",
      description: "Alternative energy solutions helping businesses transition to cleaner fuel sources.",
      industry: "EnergyTech",
      founded: "2017",
      location: "Johannesburg",
      highlight: "Reduced carbon footprint by 10,000+ tons",
      linkedin: "https://www.linkedin.com/company/alliance-for-rural-electrification/",
      website: "https://fuelswitch.co.za"
    }
  ];

  const handleDownload = () => {
    // Create a download link for the public startups.csv file
    const link = document.createElement('a');
    link.href = '/startups.csv';
    link.download = 'south-african-startups.csv';
    link.click();
  };

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        marginBottom: 36,
        textAlign: 'center'
      }}>
        
        
        <Button 
          icon={<FileExcelOutlined />} 
          onClick={handleDownload}
          style={{ 
            color: '#6b21a8', 
            borderColor: '#6b21a8',
            marginBottom: 16
          }}
        >
          Download Full Startup List
        </Button>
        
        <Paragraph style={{ 
          maxWidth: '800px', 
          color: '#333', 
          fontSize: '16px',
          lineHeight: 1.6
        }}>
          We've compiled a starter database of over 100 innovative South African startups across various industries. 
          The downloadable CSV provides  details including company names, industry sectors, and location. This is a small 
          start to connecting with South Africa's vibrant startup landscape.
        </Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        {finalists.map((finalist) => (
          <Col key={finalist.name} xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card
              style={{ 
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #e8e8e8',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}
              hoverable
              bodyStyle={{ 
                padding: '24px', 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%' 
              }}
            >
              <div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: 16 
                }}>
                  <Title level={3} style={{ 
                    margin: 0, 
                    fontSize: '22px',
                    color: '#6b21a8' 
                  }}>
                    {finalist.name}
                  </Title>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <a
                      href={finalist.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#0077B5',
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <LinkedinOutlined />
                    </a>
                    <a
                      href={finalist.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#6b21a8',
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <GlobalOutlined />
                    </a>
                  </div>
                </div>
                
                <div style={{ marginBottom: 16 }}>
                  <Tag color="purple">{finalist.industry}</Tag>
                  <Tag color="blue">{finalist.location}</Tag>
                  <Tag color="cyan">Est. {finalist.founded}</Tag>
                </div>
                
                <Divider style={{ margin: '16px 0' }} />
                
                <Paragraph style={{ 
                  marginBottom: 24,
                  fontSize: '16px',
                  lineHeight: '1.6',
                  flexGrow: 1
                }}>
                  {finalist.description}
                </Paragraph>
                
                <div style={{ 
                  background: '#f9f0ff', 
                  padding: '12px 16px', 
                  borderRadius: '8px'
                }}>
                  <Text strong style={{ color: '#6b21a8', fontSize: '16px' }}>
                    <FireOutlined style={{ marginRight: 8 }} />
                    {finalist.highlight}
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StartupFinalists;