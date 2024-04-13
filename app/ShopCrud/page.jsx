"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextInput,
  Group,
  Notification,
  Container,
  LoadingOverlay,
  Box,
} from "@mantine/core";


const CreateShop = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    shopName: "",
    startingDate: new Date().toISOString().slice(0, 10),
    location: "",
    gameType: "",
    username: "",
    phoneNumber: "",
    superAgent: "",
    percentage: "",
  });
  const [notification, setNotification] = useState(null);
  const [shops, setShops] = useState([]);
  const [editingShopId, setEditingShopId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading overlay

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserId(user.id);
    }
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      setLoading(true); // Show loading overlay
      const response = await axios.get("https://shop-d2bg.onrender.com/shops");
      setShops(response.data);
      setLoading(false); // Hide loading overlay
    } catch (error) {
      setLoading(false); // Hide loading overlay in case of error
      console.error("Error fetching Shops:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Show loading overlay
      const response = await axios.post(
        `https://shop-d2bg.onrender.com/shops/${userId}`,
        formData
      );
      setNotification({
        type: "success",
        message: "Shop created successfully",
      });
      setFormData({
        ownerName: "",
        shopName: "",
        startingDate: "",
        location: "",
        gameType: "",
        username: "",
        phoneNumber: "",
        superAgent: "",
        percentage: "",
      });
      fetchShops();
    } catch (error) {
      console.error("Error creating Shop:", error);
      setNotification({ type: "error", message: "Failed to create Shop" });
    } finally {
      setLoading(false); // Hide loading overlay after request completes
    }
  };

  const handleDeleteShop = async (shopId) => {
    try {
      setLoading(true); // Show loading overlay
      await axios.delete(
        `https://shop-d2bg.onrender.com/shops/${shopId}/${userId}`
      );
      setNotification({
        type: "success",
        message: "Shop deleted successfully",
      });
      fetchShops();
    } catch (error) {
      console.error("Error deleting Shop:", error);
      setNotification({ type: "error", message: "Failed to delete Shop" });
    } finally {
      setLoading(false); // Hide loading overlay after request completes
    }
  };

  const handleEditShop = (shop) => {
    setFormData({
      ownerName: shop.ownerName,
      shopName: shop.shopName,
      startingDate: shop.startingDate,
      location: shop.location,
      gameType: shop.gameType,
      username: shop.username,
      phoneNumber: shop.phoneNumber,
      superAgent: shop.superAgent,
      percentage: shop.percentage,
    });
    setEditingShopId(shop.shop_id);
  };

  const handleUpdateShop = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      setLoading(true); // Show loading overlay
      const response = await axios.put(
        `https://shop-d2bg.onrender.com/shops/${editingShopId}/${userId}`,
        formData
      );
      console.log("Put request:", response.data);
      setNotification({
        type: "success",
        message: "Shop updated successfully",
      });
      // Reset form data
      setFormData({
        ownerName: "",
        shopName: "",
        startingDate: "",
        location: "",
        gameType: "",
        username: "",
        phoneNumber: "",
        superAgent: "",
        percentage: "",
      });
      setEditingShopId(null);
      fetchShops();
    } catch (error) {
      console.error("Error updating shop:", error);
      setNotification({ type: "error", message: "Failed to update shop" });
    } finally {
      setLoading(false); // Hide loading overlay after request completes
    }
  };
  return (
    <Container>
      <h1>Shop Form</h1>
      <LoadingOverlay visible={loading} zIndex={1000} />
      {notification && (
        <Notification
          title={notification.type === "success" ? "Success" : "Error"}
          color={notification.type}
          onClose={() => setNotification(null)}
        >
          {notification.message}
        </Notification>
      )}
      {editingShopId ? (
        <div>
          <form onSubmit={handleUpdateShop}>
            <Group position="center" spacing="md">
              <TextInput
                label="Owner Name"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
              />
              <TextInput
                label="Shop Name"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                required
              />
              <TextInput
                label="Starting Date"
                name="startingDate"
                value={formData.startingDate}
                onChange={handleChange}
                disabled
                required
              />
              <TextInput
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
              <TextInput
                label="Game Type"
                name="gameType"
                value={formData.gameType}
                onChange={handleChange}
                required
              />
              <TextInput
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <TextInput
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              <TextInput
                label="Super Agent"
                name="superAgent"
                value={formData.superAgent}
                onChange={handleChange}
                required
              />
              <TextInput
                label="Percentage"
                type="number"
                name="percentage"
                min="0"
                max="100"
                value={formData.percentage}
                onChange={handleChange}
                required
              />
              <Button type="submit">Update Shop</Button>
            </Group>
          </form>
          <Button onClick={() => setEditingShopId(null)}>Cancel</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Group position="center" spacing="md">
            <TextInput
              label="Owner Name"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Shop Name"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Starting Date"
              name="startingDate"
              value={formData.startingDate}
              onChange={handleChange}
              disabled
              required
            />
            <TextInput
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Game Type"
              name="gameType"
              value={formData.gameType}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Super Agent"
              name="superAgent"
              value={formData.superAgent}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Percentage"
              type="number"
              name="percentage"
              min="0"
              max="100"
              value={formData.percentage}
              onChange={handleChange}
              required
            />
            <Button type="submit">Create Shop</Button>
          </Group>
        </form>
      )}
      <div>
        <div>Shops</div>
        <ul>
          {shops.map((shop) => (
            <li key={shop.shop_id}>
              <div>ID: {shop.shop_id}</div>
              <div>Owner Name: {shop.ownerName}</div>
              <div>Shop Name: {shop.shopName}</div>
              <div>Starting Date: {shop.startingDate}</div>
              <div>Location: {shop.location}</div>
              <div>Game Type: {shop.gameType}</div>
              <div>Username: {shop.username}</div>
              <div>Phone Number: {shop.phoneNumber}</div>
              <div>Super Agent: {shop.superAgent}</div>
              <div>Percentage: {shop.percentage}</div>
              <Button onClick={() => handleEditShop(shop)}>Edit</Button>
              <Button onClick={() => handleDeleteShop(shop.shop_id)}>Delete</Button>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default CreateShop;
