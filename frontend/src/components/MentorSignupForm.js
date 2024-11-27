import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Tag, message } from 'antd';

const { Option } = Select;

const MentorSignupForm = ({ mentor, expertiseOptions, onSave, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: mentor?.name || '',
        contact_info: mentor?.contact_info || '',
    });
    const [expertiseOptions, setExpertiseOptions] = useState([]);
    const [selectedExpertiseIds, setSelectedExpertiseIds] = useState([]);

    // Fetch expertise options from the backend
    useEffect(() => {
        const fetchExpertiseOptions = async () => {
            try {
                const response = await fetch('/expertise');
                const data = await response.json();
                setExpertiseOptions(data || []);
            } catch (err) {
                console.error('Failed to fetch expertise options:', err);
                message.error('Failed to fetch expertise options.');
            }
        };

        fetchExpertiseOptions();
    }, []);

    // Sync selectedExpertiseIds with mentor data when mentor prop changes
    useEffect(() => {
        if (mentor) {
        console.log('Mentor:', mentor);
        console.log('Mentor Expertises:', mentor.expertises);
        console.log('Mentor Needs:', mentor.needs);
            setFormData({
                name: mentor.name || '',
                contact_info: mentor.contact_info || '',
            });

            // Match expertise names in `mentor.expertises` to their corresponding IDs in `expertiseOptions`
            if (expertiseOptions.length > 0) {
                const matchedExpertiseIds = expertiseOptions
                    .filter((opt) => mentor.expertises.includes(opt.name))
                    .map((opt) => opt.id);
                setSelectedExpertiseIds(matchedExpertiseIds);
            }
        }
    }, [mentor, expertiseOptions]);

    const handleFormSubmit = async () => {
        const submitData = {
            ...formData,
            expertises: selectedExpertiseIds, // Send IDs of the expertise to the backend
        };

        const method = mentor ? 'PUT' : 'POST';
        const endpoint = mentor ? `/mentors/me` : `/mentors`;

        try {
            // Replace this with the actual API endpoint
            const response = await fetch(`/mentors/${mentor ? 'me' : ''}`, {
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

    return (
        <Form
            layout="vertical"
            onFinish={handleFormSubmit}
            initialValues={{ ...formData, expertises: selectedExpertiseIds }}
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
