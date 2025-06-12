import Header from "../Header/Header";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex h-screen overflow-hidden ">
      {/* fixed sidebar  */}
      <div className="w-64 fixed top-0 left-0 h-screen bg-white shadow-md z-10">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 ml-64">
        {/* Header (fixed) */}
        <div className="fixed  top-0 left-64 right-0 h-20 bg-white shadow-md z-10 flex items-center px-4">
          <Header />
        </div>

        {/* Page content with scroll */}
        <div className="flex-1 mt-16 overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
