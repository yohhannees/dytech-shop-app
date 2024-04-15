import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Table, LoadingOverlay } from "@mantine/core";
import ShopUpdateDelete from "../../components/shop-manage/shopUpdateDelete";

const ShopData = () => {
  const [notification, setNotification] = useState(null);
  const [shops, setShops] = useState([]);
  const [editingShopId, setEditingShopId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentShopId, setCurrentShopId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    if (user) {
      setUserId(user.id);
    }
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://shop-d2bg.onrender.com/shops");
      setShops(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching Shops:", error);
    }
  };

  const handleEditShop = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteShop = async (shopId: any) => {
    try {
      setLoading(true);
      await axios.delete(
        `https://shop-d2bg.onrender.com/shops/${shopId}/${userId}`
      );
      // setNotification({
      //   type: "success",
      //   message: "Shop deleted successfully",
      // });
      fetchShops();
    } catch (error) {
      console.error("Error deleting Shop:", error);
      // setNotification({ type: "error", message: "Failed to delete Shop" });
    } finally {
      setLoading(false);
    }
  };

  const rows = shops?.map((shop: any) => (
    <Table.Tr key={shop.shop_id}>
      <Table.Td>{shop.shop_id}</Table.Td>
      <Table.Td>{shop.ownerName}</Table.Td>
      <Table.Td>{shop.shopName}</Table.Td>
      <Table.Td>
        {shop.startingDate.slice(0, 10) +
          ", " +
          shop.startingDate.slice(11, 20)}
      </Table.Td>

      <Table.Td> {shop.location}</Table.Td>
      <Table.Td> {shop.gameType}</Table.Td>
      <Table.Td> {shop.username}</Table.Td>
      <Table.Td> {shop.phoneNumber}</Table.Td>
      <Table.Td> {shop.superAgent}</Table.Td>
      <Table.Td> {shop.percentage}</Table.Td>
      <Table.Td>
        <Button
          size="xs"
          variant="outline"
          mx="5"
          my="10"
          onClick={() => {
            setCurrentShopId(shop.shop_id);
            handleEditShop();
          }}
        >
          Edit
        </Button>
        <Button
          size="xs"
          variant="outline"
          color="red"
          mx="5"
          onClick={() => {
            handleDeleteShop(shop.shop_id);
          }}
        >
          Delete
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div style={{ overflowX: "auto" }}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Shop ID </Table.Th>
            <Table.Th>Owner Name</Table.Th>
            <Table.Th>Shop Name</Table.Th>
            <Table.Th>Starting Date</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>Game Type</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Phone Number</Table.Th>
            <Table.Th>Super Agent</Table.Th>
            <Table.Th>Percentage</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <LoadingOverlay visible={loading} zIndex={1000} />
        <Table.Tbody>
          {shops.length !== 0 ? (
            rows.map((row) => (
              <tr className="text-center" key={row.key}>
                {row.props.children.map((column: any, index: any) => (
                  <Table.Td key={index}>{column}</Table.Td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={11} className="p-4 text-center text-white bg-black">
                No Data Found
              </td>
            </tr>
          )}
        </Table.Tbody>
      </Table>
      <Modal
        title="Edit Shop"
        opened={showModal}
        onClose={handleCloseModal}
        size="md"
      >
        <ShopUpdateDelete
          fetchShops={shops?.filter(
            (shop: any) => shop?.shop_id === currentShopId
          )}
        />
      </Modal>
    </div>
  );
};

export default ShopData;
