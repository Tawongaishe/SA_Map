// src/components/SignupForm.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Tag, message } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const SignupForm = ({ onSignup }) => {
    const [industriesOptions, setIndustriesOptions] = useState([]);
    const [selectedIndustryIds, setSelectedIndustryIds] = useState([]);

    useEffect(() => {
        const fetchIndustries = async () => {
            try {
                const response = await fetch('/users/industries', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.ok) {
                    const industries = await response.json();
                    setIndustriesOptions(industries);
                } else {
                    console.error('Failed to fetch industries');
                }
            } catch (error) {
                console.error('Error fetching industries:', error);
            }
        };
        fetchIndustries();
    }, []);

    const handleSubmit = async (values) => {
        const signupData = {
            ...values,
            industries: selectedIndustryIds,
        };

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupData),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user_id', data.session);
                onSignup();
                message.success('Signup successful');
            } else {
                message.error('Signup failed');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            message.error('An error occurred. Please try again.');
        }
    };

    return (
        <Form
            layout="vertical"
            onFinish={handleSubmit}
            style={{ maxWidth: '600px', margin: '0 auto' }}
        >
            <h2>Sign Up for an Account</h2>
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    { required: true, message: 'Please enter your name!' },
                ]}
            >
                <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please enter your email!' },
                    { type: 'email', message: 'Please enter a valid email!' },
                ]}
            >
                <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: 'Please enter your password!' },
                ]}
            >
                <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item label="Location" name="location">
                <Input placeholder="Enter your location" />
            </Form.Item>
            <Form.Item label="About Me" name="blurb">
                <TextArea placeholder="Tell us about yourself" rows={4} />
            </Form.Item>
            <Form.Item label="Industries">
                <Select
                    mode="multiple"
                    placeholder="Select industries"
                    onChange={(values) => setSelectedIndustryIds(values)}
                    value={selectedIndustryIds}
                >
                    {industriesOptions.map((industry) => (
                        <Option key={industry.id} value={industry.id}>
                            {industry.name}
                        </Option>
                    ))}
                </Select>
                <div style={{ marginTop: '10px' }}>
                    {selectedIndustryIds.map((id) => {
                        const industry = industriesOptions.find((ind) => ind.id === id);
                        return (
                            <Tag
                                key={id}
                                closable
                                onClose={() =>
                                    setSelectedIndustryIds(selectedIndustryIds.filter((industryId) => industryId !== id))
                                }
                            >
                                {industry?.name}
                            </Tag>
                        );
                    })}
                </div>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Sign Up
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SignupForm;
