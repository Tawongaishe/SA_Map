import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Tag, message, Radio, Space, Steps, Card } from 'antd';
import { UserOutlined, BuildOutlined, LinkOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Step } = Steps;

const MentorOnboarding = ({ onComplete, onSkip }) => {
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = useState(0);
    const [expertiseOptions, setExpertiseOptions] = useState([]);
    const [selectedExpertiseIds, setSelectedExpertiseIds] = useState([]);
    const [selectedMentorNeedsIds, setSelectedMentorNeedsIds] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        contact_info: '',
        linkedin: '',
        profile_icon_id: 4, // Default to learning (4)
    });

    // Profile icon options
    const iconOptions = [
        { id: 1, label: 'Building', description: 'For those actively developing their product or service' },
        { id: 2, label: 'Funding/Raising', description: 'For startups seeking capital or preparing for fundraising' },
        { id: 3, label: 'Connecting', description: 'For those seeking partnerships or community' },
        { id: 4, label: 'Learning', description: 'For students and those seeking knowledge' },
    ];

    // Fetch expertise options from the backend
    useEffect(() => {
        const fetchExpertiseOptions = async () => {
            try {
                const response = await fetch('/api/expertise');
                const data = await response.json();
                setExpertiseOptions(data || []);
            } catch (err) {
                console.error('Failed to fetch expertise options:', err);
                message.error('Failed to fetch expertise options.');
            }
        };

        fetchExpertiseOptions();
    }, []);

    // Go to next step
    const nextStep = () => {
        form.validateFields().then(() => {
            setCurrentStep(currentStep + 1);
        }).catch(error => {
            console.log('Validation failed:', error);
        });
    };

    // Go to previous step
    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            await form.validateFields();
            const values = form.getFieldsValue();
            
            const submitData = {
                ...formData,
                expertises: selectedExpertiseIds,
                mentor_needs: selectedMentorNeedsIds,
            };

            const response = await fetch('/api/mentors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to create mentor profile.');
            }
            
            const newMentor = await response.json();
            message.success('Mentor profile created successfully!');
            onComplete(newMentor);
        } catch (err) {
            console.error('Error submitting mentor profile:', err);
            console.log('Form data:', formData);
            console.log('Selected expertises:', selectedExpertiseIds);
            console.log('Selected mentor needs:', selectedMentorNeedsIds);

            message.error('Failed to submit mentor profile: ' + err.message);
        }
    };

    // Handle expertise selection change
    const handleExpertiseChange = (selectedIds) => {
        setSelectedExpertiseIds(selectedIds);
    };

    // Handle mentor needs selection change
    const handleMentorNeedsChange = (selectedIds) => {
        setSelectedMentorNeedsIds(selectedIds);
    };

    // Handle profile icon change
    const handleIconChange = (e) => {
        setFormData({ ...formData, profile_icon_id: parseInt(e.target.value) });
    };

    // Render step content based on current step
    // Render different form sections based on current step
    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="step-content">
                    
                        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '12px' }}>Join our network of peer experts and help support South African entrepreneurs. As a peer expert, you'll have the opportunity to share your expertise while also connecting with other experts for your own growth.</p>
                        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>This short onboarding will help us match you with the right peers.</p>
                        <div className="step-actions" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
                            <Button 
                                onClick={onSkip} 
                                style={{ marginRight: '12px' }}
                            >
                                Skip for Now
                            </Button>
                            <Button 
                                type="primary" 
                                onClick={nextStep}
                                style={{ 
                                    background: '#F97316', 
                                    borderColor: '#F97316',
                                    height: '40px',
                                    paddingLeft: '24px',
                                    paddingRight: '24px',
                                }}
                            >
                                Get Started
                            </Button>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="step-content">
                        <h2 style={{ color: '#6B21A8', fontSize: '24px', marginBottom: '24px' }}>Basic Information</h2>
                        <Form.Item
                            label={<span style={{ fontSize: '16px' }}>Name</span>}
                            name="name"
                            rules={[{ required: true, message: 'Please enter your name!' }]}
                        >
                            <Input 
                                placeholder="Enter your name" 
                                prefix={<UserOutlined />}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{ height: '40px', borderRadius: '6px' }}
                            />
                        </Form.Item>
                        <Form.Item
                            label={<span style={{ fontSize: '16px' }}>Contact Info</span>}
                            name="contact_info"
                            rules={[{ required: true, message: 'Please enter your contact information!' }]}
                        >
                            <Input 
                                placeholder="Enter your contact information" 
                                onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                                style={{ height: '40px', borderRadius: '6px' }}
                            />
                        </Form.Item>
                        <Form.Item
                            label={<span style={{ fontSize: '16px' }}>LinkedIn</span>}
                            name="linkedin"
                            rules={[{ required: true, message: 'Please enter your LinkedIn!' }]}
                        >
                            <Input 
                                placeholder="https://linkedin.com/in/yourprofile" 
                                prefix={<LinkOutlined />}
                                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                style={{ height: '40px', borderRadius: '6px' }}
                            />
                        </Form.Item>
                        <div className="step-actions" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
                            <Button 
                                onClick={prevStep} 
                                style={{ marginRight: '12px' }}
                            >
                                Back
                            </Button>
                            <Button 
                                type="primary" 
                                onClick={nextStep}
                                style={{ 
                                    background: '#F97316', 
                                    borderColor: '#F97316',
                                    height: '40px' 
                                }}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="step-content">
                        <h2 style={{ color: '#6B21A8', fontSize: '24px', marginBottom: '16px' }}>Your Primary Focus</h2>
                        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>Select the option that best represents your main area of expertise or focus.</p>
                        <Form.Item
                            name="profile_icon_id"
                            rules={[{ required: true, message: 'Please select your primary focus!' }]}
                        >
                            <Radio.Group onChange={handleIconChange} value={formData.profile_icon_id}>
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    {iconOptions.map(icon => (
                                        <Radio.Button 
                                            key={icon.id} 
                                            value={icon.id}
                                            style={{ 
                                                width: '100%', 
                                                height: 'auto',
                                                padding: '12px 16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                border: formData.profile_icon_id === icon.id ? '2px solid #F97316' : '1px solid #E5E7EB',
                                                backgroundColor: formData.profile_icon_id === icon.id ? '#FFF7ED' : 'white',
                                                marginBottom: '12px',
                                                borderRadius: '8px'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img 
                                                    src={`/icons/${icon.id}.png`} 
                                                    alt={icon.label}
                                                    style={{ 
                                                        width: '48px', 
                                                        height: '48px', 
                                                        marginRight: '16px',
                                                        borderRadius: '50%',
                                                    }}
                                                />
                                                <div>
                                                    <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#111827' }}>{icon.label}</div>
                                                    <div style={{ fontSize: '14px', color: '#6B7280' }}>{icon.description}</div>
                                                </div>
                                            </div>
                                        </Radio.Button>
                                    ))}
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                        <div className="step-actions" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
                            <Button 
                                onClick={prevStep} 
                                style={{ marginRight: '12px' }}
                            >
                                Back
                            </Button>
                            <Button 
                                type="primary" 
                                onClick={nextStep}
                                style={{ 
                                    background: '#F97316', 
                                    borderColor: '#F97316',
                                    height: '40px' 
                                }}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="step-content">
                        <h2 style={{ color: '#6B21A8', fontSize: '24px', marginBottom: '16px' }}>Areas of Expertise</h2>
                        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>Select your areas of expertise to help us match you with entrepreneurs who need your knowledge.</p>
                        <Form.Item 
                            label={<span style={{ fontSize: '16px' }}>Your Expertise</span>}
                            name="expertises"
                        >
                            <Select
                                mode="multiple"
                                placeholder="Select your areas of expertise"
                                value={selectedExpertiseIds}
                                onChange={handleExpertiseChange}
                                style={{ width: '100%', borderRadius: '6px' }}
                            >
                                {expertiseOptions.map((option) => (
                                    <Option key={option.id} value={option.id}>
                                        {option.name}
                                    </Option>
                                ))}
                            </Select>
                            <div style={{ marginTop: '16px' }}>
                                {selectedExpertiseIds.map((id) => {
                                    const expertise = expertiseOptions.find((opt) => opt.id === id);
                                    return (
                                        <Tag
                                            key={id}
                                            closable
                                            onClose={() => handleExpertiseChange(selectedExpertiseIds.filter((expId) => expId !== id))}
                                            style={{ 
                                                background: '#DDD6FE', 
                                                color: '#6B21A8', 
                                                border: 'none', 
                                                margin: '4px',
                                                padding: '4px 10px',
                                                borderRadius: '16px',
                                                fontSize: '14px'
                                            }}
                                        >
                                            {expertise?.name || 'Unnamed'}
                                        </Tag>
                                    );
                                })}
                            </div>
                        </Form.Item>
                        <div className="step-actions" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
                            <Button 
                                onClick={prevStep} 
                                style={{ marginRight: '12px' }}
                            >
                                Back
                            </Button>
                            <Button 
                                type="primary" 
                                onClick={nextStep}
                                style={{ 
                                    background: '#F97316', 
                                    borderColor: '#F97316',
                                    height: '40px' 
                                }}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="step-content">
                        <h2 style={{ color: '#6B21A8', fontSize: '24px', marginBottom: '16px' }}>Areas You'd Like Help With</h2>
                        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>Our peer network is designed to be mutually beneficial. Select areas where you'd like to receive guidance or advice from other peers.</p>
                        <Form.Item 
                            label={<span style={{ fontSize: '16px' }}>Areas You Need Help With</span>}
                            name="mentor_needs"
                        >
                            <Select
                                mode="multiple"
                                placeholder="Select areas you'd like help with"
                                value={selectedMentorNeedsIds}
                                onChange={handleMentorNeedsChange}
                                style={{ width: '100%', borderRadius: '6px' }}
                            >
                                {expertiseOptions.map((option) => (
                                    <Option key={option.id} value={option.id}>
                                        {option.name}
                                    </Option>
                                ))}
                            </Select>
                            <div style={{ marginTop: '16px' }}>
                                {selectedMentorNeedsIds.map((id) => {
                                    const expertise = expertiseOptions.find((opt) => opt.id === id);
                                    return (
                                        <Tag
                                            key={id}
                                            closable
                                            onClose={() => handleMentorNeedsChange(selectedMentorNeedsIds.filter((expId) => expId !== id))}
                                            style={{ 
                                                background: '#FFEDD5', 
                                                color: '#C2410C', 
                                                border: 'none', 
                                                margin: '4px',
                                                padding: '4px 10px',
                                                borderRadius: '16px',
                                                fontSize: '14px'
                                            }}
                                        >
                                            {expertise?.name || 'Unnamed'}
                                        </Tag>
                                    );
                                })}
                            </div>
                        </Form.Item>
                        <div className="step-actions" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
                            <Button 
                                onClick={prevStep} 
                                style={{ marginRight: '12px' }}
                            >
                                Back
                            </Button>
                            <Button 
                                type="primary" 
                                onClick={handleSubmit}
                                style={{ 
                                    background: '#F97316', 
                                    borderColor: '#F97316',
                                    height: '40px',
                                    paddingLeft: '24px',
                                    paddingRight: '24px',
                                }}
                            >
                                Complete Profile
                            </Button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #5B21B6 0%, #8B5CF6 50%, #F97316 100%)',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>
            <Card 
                style={{ 
                    width: '100%', 
                    maxWidth: '700px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    padding: '12px'
                }}
            >
                <Form form={form} layout="vertical">
                    <div style={{ marginBottom: '32px', textAlign: 'center' }}>
                        <h1 style={{ color: '#6B21A8', fontSize: '28px', marginBottom: '8px' }}>
                            Join Our Peer Network Today!
                        </h1>
                        <p style={{ color: '#6B7280', fontSize: '16px' }}>
                            Help grow the South African startup ecosystem
                        </p>
                    </div>
                    
                    <Steps current={currentStep} style={{ marginBottom: '32px' }}>
                        <Step title="Welcome" icon={<UserOutlined />} />
                        <Step title="Profile" icon={<UserOutlined />} />
                        <Step title="Focus" icon={<BuildOutlined />} />
                        <Step title="Expertise" icon={<ThunderboltOutlined />} />
                        <Step title="Needs" icon={<ThunderboltOutlined />} />
                    </Steps>
                    
                    <div className="steps-content" style={{ padding: '16px 8px' }}>
                        {renderStepContent()}
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default MentorOnboarding;