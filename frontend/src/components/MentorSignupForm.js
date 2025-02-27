import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Tag, message, Radio, Space } from 'antd';

const { Option } = Select;

const MentorSignupForm = ({ mentor, onSave, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: mentor?.name || '',
        contact_info: mentor?.contact_info || '',
        linkedin: mentor?.linkedin || '',
        profile_icon_id: mentor?.profile_icon_id || 4, // Default to learning (4)
    });
    const [expertiseOptions, setExpertiseOptions] = useState([]);
    const [selectedExpertiseIds, setSelectedExpertiseIds] = useState([]);
    const [selectedMentorNeedsIds, setSelectedMentorNeedsIds] = useState([]);

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

    // Sync data when mentor prop changes
    useEffect(() => {
        if (mentor) {
            setFormData({
                name: mentor.name || '',
                contact_info: mentor.contact_info || '',
                linkedin: mentor.linkedin || '',
                profile_icon_id: mentor.profile_icon_id || 4,
            });

            // Match expertise names
            if (expertiseOptions.length > 0) {
                const matchedExpertiseIds = expertiseOptions
                    .filter((opt) => mentor.expertises.includes(opt.name))
                    .map((opt) => opt.id);
                setSelectedExpertiseIds(matchedExpertiseIds);

                const matchedMentorNeedsIds = expertiseOptions
                    .filter((opt) => mentor.mentor_needs.includes(opt.name))
                    .map((opt) => opt.id);

                setSelectedMentorNeedsIds(matchedMentorNeedsIds);
            }
        }
    }, [mentor, expertiseOptions]);

    const handleFormSubmit = async () => {
        const submitData = {
            ...formData,
            expertises: selectedExpertiseIds,
            mentor_needs: selectedMentorNeedsIds,
        };

        try {
            const response = await fetch(`/api/mentors${mentor ? '/me' : ''}`, {
                method: mentor ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to save mentor profile.');
            }
            const updatedMentor = await response.json();
            onSuccess(updatedMentor);
            message.success(mentor ? 'Mentor profile updated successfully!' : 'Mentor profile created successfully!');
        } catch (err) {
            console.error('Error submitting mentor profile:', err);
            message.error('Failed to submit mentor profile.');
        }
    };

    // Handle changes in expertise selection
    const handleExpertiseChange = (selectedIds) => {
        setSelectedExpertiseIds(selectedIds);
    };

    const handleMentorNeedsChange = (selectedIds) => {
        setSelectedMentorNeedsIds(selectedIds);
    };

    // Handle profile icon selection
    const handleIconChange = (e) => {
        setFormData({ ...formData, profile_icon_id: parseInt(e.target.value) });
    };

    return (
        <Form
            layout="vertical"
            onFinish={handleFormSubmit}
            initialValues={{ 
                ...formData, 
                expertises: selectedExpertiseIds,
                profile_icon_id: formData.profile_icon_id 
            }}
        >
            {/* Name */}
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name!' }]}
            >
                <Input
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </Form.Item>

            {/* Profile Icon Selection */}
            <Form.Item
                label="What best describes your primary need?"
                name="profile_icon_id"
                rules={[{ required: true, message: 'Please select your primary need!' }]}
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
                                    padding: '10px 15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: formData.profile_icon_id === icon.id ? '2px solid #1890ff' : '1px solid #d9d9d9',
                                    backgroundColor: formData.profile_icon_id === icon.id ? '#e6f7ff' : 'white',
                                    marginBottom: '8px',
                                    borderRadius: '6px'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img 
                                        src={`/icons/${icon.id}.png`} 
                                        alt={icon.label}
                                        style={{ 
                                            width: '40px', 
                                            height: '40px', 
                                            marginRight: '15px',
                                            borderRadius: '50%',
                                        }}
                                    />
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{icon.label}</div>
                                        <div style={{ fontSize: '12px', color: '#666' }}>{icon.description}</div>
                                    </div>
                                </div>
                            </Radio.Button>
                        ))}
                    </Space>
                </Radio.Group>
            </Form.Item>

            {/* Expertise */}
            <Form.Item label="Expertise" name="expertises">
                <Select
                    mode="multiple"
                    placeholder="Select your areas of expertise"
                    value={selectedExpertiseIds}
                    onChange={handleExpertiseChange}
                    style={{ width: '100%' }}
                >
                    {expertiseOptions.map((option) => (
                        <Option key={option.id} value={option.id}>
                            {option.name}
                        </Option>
                    ))}
                </Select>
                <div style={{ marginTop: '10px' }}>
                    {selectedExpertiseIds.map((id) => {
                        const expertise = expertiseOptions.find((opt) => opt.id === id);
                        return (
                            <Tag
                                key={id}
                                closable
                                onClose={() => handleExpertiseChange(selectedExpertiseIds.filter((expId) => expId !== id))}
                            >
                                {expertise?.name || 'Unnamed'}
                            </Tag>
                        );
                    })}
                </div>
            </Form.Item>

            {/* Contact Info */}
            <Form.Item
                label="Contact Info"
                name="contact_info"
                rules={[{ required: true, message: 'Please enter your contact information!' }]}
            >
                <Input
                    placeholder="Enter your contact information"
                    value={formData.contact_info}
                    onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                />
            </Form.Item>

            {/* Linkedin */}
            <Form.Item
                label="Linkedin"
                name="linkedin"
                rules={[{ required: true, message: 'Please enter your Linkedin!' }]}
            >
                <Input
                    placeholder="Enter your Linkedin"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                />
            </Form.Item>

            {/* Mentor Needs */}
            <Form.Item
                label="Mentor Needs"
                name="mentor_needs"
            >
                <Select
                    mode="multiple"
                    placeholder="Select your mentor needs"
                    value={selectedMentorNeedsIds}
                    onChange={handleMentorNeedsChange}
                    style={{ width: '100%' }}
                >
                    {expertiseOptions.map((option) => (
                        <Option key={option.id} value={option.id}>
                            {option.name}
                        </Option>
                    ))}
                </Select>
                <div style={{ marginTop: '10px' }}>
                    {selectedMentorNeedsIds.map((id) => {
                        const expertise = expertiseOptions.find((opt) => opt.id === id);
                        return (
                            <Tag
                                key={id}
                                closable
                                onClose={() => handleMentorNeedsChange(selectedMentorNeedsIds.filter((expId) => expId !== id))}
                            >
                                {expertise?.name || 'Unnamed'}
                            </Tag>
                        );
                    })}
                </div>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    {mentor ? 'Save Changes' : 'Sign Up'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default MentorSignupForm;