// import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <footer className="bg-gray-800 text-white text-center p-4 mt-4">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Layout;
