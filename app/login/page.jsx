"use client";
import { useState } from "react";
import { Button, TextInput, Notification } from "@mantine/core";
import axios from "axios";
import { LoadingOverlay, Box, Group } from "@mantine/core";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://shop-d2bg.onrender.com/auth/login",
        { username, password }
      );
      if (username === "ADMIN" && password === "7vzwj36q0ud") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/shop-manage";
      }
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "auto",
        paddingTop: 80,
        paddingLeft: 30,
        paddingRight: 30,
      }}
    >
      <h1>Shop Data Login</h1>
      {error && (
        <Notification color="red" title="Error" onClose={() => setError("")}>
          {error}
        </Notification>
      )}
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            marginTop: "3vh",
          }}
        />
        <Group
          position="relative"
          style={{
            marginTop: "3vh",
          }}
        >
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
          <Box position="absolute" top={0} right={0}>
            <LoadingOverlay visible={loading} />
          </Box>
        </Group>
      </form>
    </div>
  );
};

export default Login;
