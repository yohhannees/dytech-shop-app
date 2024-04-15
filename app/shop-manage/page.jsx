"use client";
import axios from "axios";
import { Container, Tabs, rem, Center } from "@mantine/core";
import Navbar from "../../components/Navbar";
import ShopData from "../../components/shop-manage/shopData";
import ShopCreate from "../../components/shop-manage/shopCreate";

const ShopManagement = () => {
  return (
    <>
      <Navbar />
      <Tabs defaultValue="create">
        <Center className="my-5">
          <Container>
            <Tabs.List>
              <Tabs.Tab value="create">Shop Create</Tabs.Tab>
              <Tabs.Tab value="data">Shop Data</Tabs.Tab>
            </Tabs.List>
          </Container>
        </Center>

        <Tabs.Panel value="create">
          <Container>
            <ShopCreate />
          </Container>
        </Tabs.Panel>

        <Tabs.Panel value="data">
          <div style={{ padding: rem(20) }}>
            <ShopData />
          </div>
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default ShopManagement;
