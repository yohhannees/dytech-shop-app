'use client';
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
      localStorage.setItem("user", JSON.stringify(response.data.user));
      window.location.href = "/";
    } catch (error) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", paddingTop: 100 }}>
      <h1>Login</h1>
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
        />
        <Group position="relative">
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
