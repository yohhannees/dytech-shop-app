import React from "react";
import CreateUserComponent from "../user-manage/page";
import SupportActionLogList from "../History/page";

const Admin = () => {
  return (
    <div>
      <h1>Admin</h1>
      <CreateUserComponent />
      <SupportActionLogList />
    </div>
  );
};

export default Admin;
