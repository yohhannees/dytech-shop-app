import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextInput, Group, Select } from "@mantine/core";

interface ShopDeleteProps {
  fetchShops: any;
}

const ShopUpdateDelete: NextPage<ShopDeleteProps> = (fetchShops) => {
  const [notification, setNotification] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const [editingShopId, setEditingShopId] = useState(null);

  useEffect(() => {
    if (fetchShops.fetchShops.length > 0) {
      const firstShop = fetchShops.fetchShops[0];
      setEditingShopId(firstShop.shop_id);
      setFormData({
        ownerName: firstShop.ownerName,
        shopName: firstShop.shopName,
        startingDate: firstShop.startingDate,
        location: firstShop.location,
        gameType: firstShop.gameType,
        username: firstShop.username,
        phoneNumber: firstShop.phoneNumber,
        superAgent: firstShop.superAgent,
        percentage: firstShop.percentage,
      });
    }
  }, [fetchShops]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    if (user) {
      setUserId(user.id);
    }
  }, []);

  const handleChange = (name: string, value: string | Date | null) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateShop = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `https://shop-d2bg.onrender.com/shops/${editingShopId}/${userId}`,
        formData
      );
      // setNotification({
      //   type: "success",
      //   message: "Shop updated successfully",
      // });
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
      window.location.reload();
    } catch (error) {
      console.error("Error updating shop:", error);
      // setNotification({ type: "error", message: "Failed to update shop" });
    } finally {
      setLoading(false);
    }
  };

  const dropdownOptions = [
    { label: "Alpha", value: "alpha" },
    { label: "Emerald", value: "emerald" },
    { label: "Kiron", value: "kiron" },
    { label: "ETVirtual", value: "etvirtual" },
  ];

  return (
    <>
      <div>
        <form onSubmit={handleUpdateShop}>
          <Group>
            <TextInput
              label="Shop Id"
              name="shopId"
              value={fetchShops.fetchShops[0].shop_id}
              disabled
              required
            />
            <TextInput
              label="Owner Name"
              name="ownerName"
              value={formData.ownerName}
              onChange={(event) =>
                handleChange("ownerName", event.currentTarget.value)
              }
              required
            />
            <TextInput
              label="Shop Name"
              name="shopName"
              value={formData.shopName}
              onChange={(event) =>
                handleChange("shopName", event.currentTarget.value)
              }
              required
            />
            <TextInput
              label="Starting Date"
              name="startingDate"
              value={
                formData.startingDate.slice(0, 10) +
                ", " +
                formData.startingDate.slice(11, 20)
              }
              onChange={(event) =>
                handleChange("startingDate", event.currentTarget.value)
              }
              disabled
              required
            />
            <TextInput
              label="Location"
              name="location"
              value={formData.location}
              onChange={(event) =>
                handleChange("location", event.currentTarget.value)
              }
              required
            />
            <Select
              value={formData.gameType}
              onChange={(value) => handleChange("gameType", value)}
              data={dropdownOptions}
              label="Select System Type"
              placeholder="Choose option..."
              searchable
            />
            <TextInput
              label="Username"
              name="username"
              value={formData.username}
              onChange={(event) =>
                handleChange("username", event.currentTarget.value)
              }
              required
            />
            <TextInput
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(event) =>
                handleChange("phoneNumber", event.currentTarget.value)
              }
              required
            />
            <TextInput
              label="Super Agent"
              name="superAgent"
              value={formData.superAgent}
              onChange={(event) =>
                handleChange("superAgent", event.currentTarget.value)
              }
              required
            />
            <TextInput
              label="Percentage"
              type="number"
              name="percentage"
              min="0"
              max="100"
              value={formData.percentage}
              onChange={(event) =>
                handleChange("percentage", event.currentTarget.value)
              }
              required
            />
            <Button type="submit">Update Shop</Button>
            <Button onClick={() => window.location.reload()} variant="outline">
              Cancel
            </Button>
          </Group>
        </form>
      </div>
    </>
  );
};

export default ShopUpdateDelete;
