'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextInput, Group, Notification, MultiSelect } from '@mantine/core';

const CreateUserComponent = () => {
  const [formData, setFormData] = useState({ username: '', email: '', permissions: [] });
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePermissionsChange = (permissions) => {
    setFormData({ ...formData, permissions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log('formData:', formData);
      const response = await axios.post('https://shop-d2bg.onrender.com/users/support', formData);
      console.log('User created:', response.data);
      setNotification({ type: 'success', message: 'User created successfully' });
      // Clear form after successful submission
      setFormData({ username: '', email: '', permissions: [] });
    } catch (error) {
      console.error('Error creating user:', error);
      setNotification({ type: 'error', message: 'Failed to create user' });
    }
  };

  return (
    <div>
      {notification && (
        <Notification
          title={notification.type === 'success' ? 'Success' : 'Error'}
          color={notification.type}
          onClose={() => setNotification(null)}
        >
          {notification.message}
        </Notification>
      )}
      <form onSubmit={handleSubmit}>
        <Group position="center" spacing="md">
          <TextInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <MultiSelect
            label="Permissions"
            name="permissions"
            data={['add', 'update', 'delete']}
            value={formData.permissions}
            onChange={handlePermissionsChange}
            required
          />
          <Button type="submit">Create User</Button>
        </Group>
      </form>
    </div>
  );
};

export default CreateUserComponent;
