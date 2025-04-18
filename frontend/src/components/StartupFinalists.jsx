import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Space, Carousel, Tag, Divider, Button } from 'antd';
import { FireOutlined, GlobalOutlined, LinkedinOutlined, FileExcelOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph, Link } = Typography;

const StartupFinalists = () => {
  const finalists = [
      
      {
        name: "BioCertica",
        description: "Provides DNA testing kits offering insights into health, fitness, and ancestry for personalized wellness.",
        industry: "Biotech",
        founded: "N/A",
        location: "N/A",
        highlight: "Recognized for excellence in DNA testing services",
        linkedin: "https://biocertica.com",
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
        website: "https://marihealth.com"
      },
      {
        name: "Plentify",
        description: "Smart water heating technology that reduces energy costs while supporting South Africa's renewable energy transition.",
        industry: "CleanTech",
        founded: "2016",
        location: "Cape Town",
        highlight: "50,000+ homes equipped",
        linkedin: "https://www.linkedin.com/company/plentify/",
        website: "https://plentify.co.za"
      },
      {
        name: "Plant the Seed",
        description: "Provides holistic recycling and waste management solutions for schools and businesses, promoting zero-waste practices.",
        industry: "EdTech",
        founded: "N/A",
        location: "N/A",
        highlight: "Trained numerous learners and diverted significant waste from landfills",
        linkedin: "https://planttheseed.co.za",
        website: "https://www.linkedin.com/company/plant-the-seed-education"
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
        description: "Luxury florist offering exquisite floral collections and gifting solutions for various occasions.",
        industry: "AgriTech",
        founded: "N/A",
        location: "Sandton",
        highlight: "Provides premium bouquets and flower boxes",
        linkedin: "https://www.enhleflora.co.za",
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
        website: "https://conservio.com"
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
        description: "Provides an easy-to-use platform for creating online stores, enabling businesses to sell products online efficiently.",
        industry: "eCommerce",
        founded: "N/A",
        location: "N/A",
        highlight: "Empowered numerous brands to establish online presence",
        linkedin: "https://www.rekisa.co.za",
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
        website: "https://keller.education"
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
        description: "Tech education platform offering accredited bootcamps in web development and data science, connecting graduates with job opportunities.",
        industry: "EdTech",
        founded: "N/A",
        location: "N/A",
        highlight: "Trained numerous developers with high course completion rates",
        linkedin: "https://www.zaio.io",
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
        website: "https://leasesurance.co"
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
        website: "https://www.jobboxafrica.com/"
      },
      {
        name: "ServCraft",
        description: "South Africa's leading job management software, helping businesses win more work, get paid faster, and enhance customer satisfaction.",
        industry: "ServiceTech",
        founded: "N/A",
        location: "N/A",
        highlight: "Trusted by thousands of installation and service teams.",
        linkedin: "https://servcraft.co.za",
        website: "https://www.linkedin.com/company/servcraft"
      },
      {
        name: "Engage Mx",
        description: "Engage Mx delivers the next generation of proactive, preventative, and personalized care.",
        industry: "HealthTech",
        founded: "2017",
        location: "Pretoria",
        highlight: "Winner of SAFT awards",
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
        description: "Providing on-demand workplace and homecare services to health insurers and corporations.",
        industry: "HealthTech",
        founded: "2021",
        location: "Johannesburg",
        highlight: "30,000+ consultations delivered",
        linkedin: "https://www.linkedin.com/company/welo-health/",
        website: "https://welo.health"
      },
      {
        name: "Sellers Plug",
        description: "Simplify your procurement of Hardware and Building Supplies.",
        industry: "eCommerce",
        founded: "2020",
        location: "Johannesburg",
        highlight: "Processing R50M in transactions monthly",
        linkedin: "https://www.linkedin.com/company/sellers-plug/",
        website: "https://sellersplug.com"
      },
      {
        name: "Tributree",
        description: "Provides real-time accurate insights into South Africa's informal retail market, empowering brands with actionable data.",
        industry: "FinTech",
        founded: "N/A",
        location: "N/A",
        highlight: "Captures data from 60% of retail outlets in South Africa.",
        linkedin: "https://tributree.co.za",
        website: "https://tributree.co.za"
      },
      {
        name: "Eagle Eye Defence",
        description: "Advanced security systems for prevention of unauthorised use of vehicles / machinery",
        industry: "SecurityTech",
        founded: "2018",
        location: "Pretoria",
        highlight: "Protecting 150+ high-security sites",
        linkedin: "https://www.linkedin.com/company/eagle-eye-defence/",
        website: "https://www.linkedin.com/company/eagle-eye-defence/"
      },
      {
        name: "Smartee - IES",
        description: "IoT solutions and cloud-based technology solutions to custom problems.",
        industry: "IoT",
        founded: "2017",
        location: "Johannesburg",
        highlight: "Trusted by Spar & other big brands",
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
        website: "https://zimicharge.com"
      },
      {
        name: "Fuel Switch",
        description: "Alternative energy solutions helping businesses transition to cleaner fuel sources.",
        industry: "EnergyTech",
        founded: "2017",
        location: "Johannesburg",
        highlight: "Reduced carbon footprint by 10,000+ tons",
        linkedin: "https://www.linkedin.com/company/alliance-for-rural-electrification/",
        website: "https://fuelswitch.io"
      }
    ];
  

  const handleDownload = () => {
    // Create a robust download link for the public startups.csv file
    const link = document.createElement('a');
    link.href = '/startups.csv';
    link.setAttribute('download', 'south-african-startups.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          fontSize: '14px',
          lineHeight: 1.6
        }}>
          We've compiled a starter database of over 100 innovative South African startups across various industries. 
          The downloadable CSV provides details including company names, industry sectors, and location. This is a small 
          start to connecting with South Africa's vibrant startup landscape.
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
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
                padding: '20px', 
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
                  marginBottom: 12 
                }}>
                  <Title level={4} style={{ 
                    margin: 0, 
                    fontSize: '18px',
                    color: '#6b21a8' 
                  }}>
                    {finalist.name}
                  </Title>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <a
                      href={finalist.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#0077B5',
                        fontSize: '16px',
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
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <GlobalOutlined />
                    </a>
                  </div>
                </div>
                
                <div style={{ marginBottom: 12 }}>
                  <Tag color="purple" style={{ fontSize: '12px' }}>{finalist.industry}</Tag>
                  <Tag color="blue" style={{ fontSize: '12px' }}>{finalist.location}</Tag>
                  <Tag color="cyan" style={{ fontSize: '12px' }}>Est. {finalist.founded}</Tag>
                </div>
                
                <Divider style={{ margin: '12px 0' }} />
                
                <Paragraph style={{ 
                  marginBottom: 16,
                  fontSize: '14px',
                  lineHeight: '1.5',
                  flexGrow: 1
                }}>
                  {finalist.description}
                </Paragraph>
                
                <div style={{ 
                  background: '#f9f0ff', 
                  padding: '10px 14px', 
                  borderRadius: '8px'
                }}>
                  <Text strong style={{ color: '#6b21a8', fontSize: '14px' }}>
                    <FireOutlined style={{ marginRight: 6 }} />
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
