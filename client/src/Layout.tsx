import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <Header />

      {/* Scrollable Content below fixed header */}
      <main className="flex-1 pt-[100px] ">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} KhanalDai. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
