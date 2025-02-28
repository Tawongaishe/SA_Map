import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Space } from 'antd';

const { TextArea } = Input;

const UserProfileForm = ({ user, industriesOptions, onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Initialize form with user data when component mounts
    form.setFieldsValue({
      location: user?.location || '',
      blurb: user?.blurb || '',
      industries: user?.industries?.map(ind => 
        typeof ind === 'string' ? ind : ind.id
      ) || []
    });
  }, [form, user]);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      
      const response = await fetch('/api/users/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      onSuccess(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        location: user?.location || '',
        blurb: user?.blurb || '',
        industries: user?.industries?.map(ind => 
          typeof ind === 'string' ? ind : ind.id
        ) || []
      }}
    >
      <Form.Item 
        name="location" 
        label="Location"
      >
        <Input placeholder="Enter your location" />
      </Form.Item>

      <Form.Item 
        name="blurb" 
        label="About Me"
      >
        <TextArea 
          placeholder="Tell us about yourself" 
          rows={4}
        />
      </Form.Item>

      <Form.Item 
        name="industries" 
        label="Industries"
      >
        <Select
          mode="multiple"
          placeholder="Select industries"
          style={{ width: '100%' }}
        >
          {industriesOptions.map((industry) => (
            <Select.Option key={industry.id} value={industry.id}>
              {industry.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Save Changes
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UserProfileForm;