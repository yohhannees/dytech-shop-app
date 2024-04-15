import Link from "next/link";
import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, Button, TextInput, Group, Grid } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

interface ShopCreateProps {
  shops: any;
}

const ShopCreate: NextPage<ShopCreateProps> = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    if (user) {
      setUserId(user.id);
    }
  }, []);

  const [formData, setFormData] = useState({
    ownerName: "",
    shopName: "",
    startingDate: new Date(),
    location: "",
    gameType: "",
    username: "",
    phoneNumber: "",
    superAgent: "",
    percentage: "",
  });
  const handleChange = (name: string, value: string | Date | null) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `https://shop-d2bg.onrender.com/shops/${userId}`,
        formData
      );
      // setNotification({
      //   type: "success",
      //   message: "Shop created successfully",
      // });
      setFormData({
        ownerName: "",
        shopName: "",
        startingDate: new Date(),
        location: "",
        gameType: "",
        username: "",
        phoneNumber: "",
        superAgent: "",
        percentage: "",
      });
    } catch (error) {
      console.error("Error creating Shop:", error);
      // setNotification({ type: "error", message: "Failed to create Shop" });
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
      <h1 className="my-5 font-bold">Shop Creation Form</h1>
      <form onSubmit={handleSubmit}>
        <Grid gutter="md">
          <Grid.Col span={4}>
            <Group>
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
                label="Location"
                name="location"
                value={formData.location}
                onChange={(event) =>
                  handleChange("location", event.currentTarget.value)
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
            </Group>
          </Grid.Col>
          <Grid.Col span={4}>
            <Group>
              <TextInput
                label="Owner Name"
                name="ownerName"
                value={formData.ownerName}
                onChange={(event) =>
                  handleChange("ownerName", event.currentTarget.value)
                }
                required
              />
              <DatePickerInput
                label="Pick starting date"
                placeholder="starting date"
                value={formData.startingDate}
                onChange={(date) =>
                  handleChange("startingDate", date ? date : new Date())
                }
                required
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
            </Group>
          </Grid.Col>
          <Grid.Col span={4}>
            <Group>
              <TextInput
                label="Super Agent"
                name="superAgent"
                value={formData.superAgent}
                onChange={(event) =>
                  handleChange("superAgent", event.currentTarget.value)
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
                label="Percentage"
                name="percentage"
                value={formData.percentage}
                onChange={(event) =>
                  handleChange("percentage", event.currentTarget.value)
                }
                required
              />
            </Group>
          </Grid.Col>
        </Grid>
        <Button type="submit" className="mt-5">
          Create Shop
        </Button>
      </form>
    </>
  );
};

export default ShopCreate;
