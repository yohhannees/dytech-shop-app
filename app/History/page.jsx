'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Group, Text, Modal, Button } from "@mantine/core";

const SupportActionLogList = () => {
  const [logs, setLogs] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get(
        "https://shop-d2bg.onrender.com/supportActionLogs"
      );
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(
        `https://shop-d2bg.onrender.com/users/${userId}`
      );
      setSelectedUser(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <Group spacing="md">
      <h2>Support Action Logs</h2>
      {logs.map((log) => (
        <div key={log.id}>
          <Text>{`User ID: ${log.userId}`}</Text>
          <Text>{`Action: ${log.action}`}</Text>
          <Text>{`Action: ${log.shop_id}`}</Text>
          <Text>{`Created At: ${new Date(
            log.createdAt
          ).toLocaleString()}`}</Text>
          <Button
            onClick={() => {
              setSelectedUserId(log.userId);
              fetchUser(log.userId);
            }}
          >
            View User
          </Button>
        </div>
      ))}

      {/* Modal to display user details */}
      <Modal
        title="User Details"
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        {selectedUser && (
          <div>
            <Text>{`ID: ${selectedUser.id}`}</Text>
            <Text>{`Username: ${selectedUser.username}`}</Text>
            <Text>{`Email: ${selectedUser.email}`}</Text>
            <Text>{`Role: ${selectedUser.role}`}</Text>
            <Text>{`Password: ${selectedUser.password}`}</Text>
            <Text>{`Permissions: ${selectedUser.permissions.join(", ")}`}</Text>
          </div>
        )}
      </Modal>
    </Group>
  );
};

export default SupportActionLogList;
