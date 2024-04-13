"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextInput,
  Group,
  Notification,
  MultiSelect,
} from "@mantine/core";

const CreateUserComponent = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    permissions: [],
    role: "",
    password: "",
  });
  const [notification, setNotification] = useState(null);
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://shop-d2bg.onrender.com/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

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
      const response = await axios.post(
        "https://shop-d2bg.onrender.com/users/support",
        formData
      );
      setNotification({
        type: "success",
        message: "User created successfully",
      });
      setFormData({ username: "", email: "", permissions: [], role: "", password: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      setNotification({ type: "error", message: "Failed to create user" });
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(
        `https://shop-d2bg.onrender.com/users/support/${userId}`
      );
      setNotification({
        type: "success",
        message: "User deleted successfully",
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setNotification({ type: "error", message: "Failed to delete user" });
    }
  };

  const handleEditUser = (user) => {
    setFormData({
      username: user.username,
      email: user.email,
      permissions: user.permissions,
      role: user.role,
      password: user.password,
    });
    setEditingUserId(user.id);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await axios.patch(
        `https://shop-d2bg.onrender.com/users/${editingUserId}`,
        formData
      );
      console.log("Patch request:", response.data);
      setNotification({
        type: "success",
        message: "User updated successfully",
      });
      setFormData({ username: "", email: "", permissions: [], role: "", password: "" });
      setEditingUserId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      setNotification({ type: "error", message: "Failed to update user" });
    }
  };

  return (
    <div>
      <div>Support Users Form</div>
      {notification && (
        <Notification
          title={notification.type === "success" ? "Success" : "Error"}
          color={notification.type}
          onClose={() => setNotification(null)}
        >
          {notification.message}
        </Notification>
      )}
      {editingUserId ? (
        <div>
          <form onSubmit={handleUpdateUser}>
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
              <TextInput
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
              <TextInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <MultiSelect
                label="Permissions"
                name="permissions"
                data={["add", "update", "delete"]}
                value={formData.permissions}
                onChange={handlePermissionsChange}
                required
              />
              <Button type="submit">Update User</Button>
            </Group>
          </form>
          <Button onClick={() => setEditingUserId(null)}>Cancel</Button>
        </div>
      ) : (
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
            <TextInput
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              disabled
            />
            <TextInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled
            />
            <MultiSelect
              label="Permissions"
              name="permissions"
              data={["add", "update", "delete"]}
              value={formData.permissions}
              onChange={handlePermissionsChange}
              required
            />
            <Button type="submit">Create User</Button>
          </Group>
        </form>
      )}
      <div>
        <div>Support Users</div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <div>ID: {user.id}</div>
              <div>Username: {user.username}</div>
              <div>Email: {user.email}</div>
              <div>Role: {user.role}</div>
              <div>Password: {user.password}</div>
              <div>Permission:{user.permissions.join(", ")}</div>
              <Button onClick={() => handleEditUser(user)}>Edit</Button>
              <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateUserComponent;