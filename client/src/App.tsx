import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import Signup from "./components/header/Signup";
import Login from "./components/header/Login";
import Webdevelopment from "./pages/Home/sidebar/Webdevelopment";
import MobileDevelopment from "./pages/Home/sidebar/MobileDevelopment";
import Machinelearning from "./pages/Home/sidebar/Machinelearning";
import DataScience from "./pages/Home/sidebar/DataScience";
import GameDevelopment from "./pages/Home/sidebar/GameDevelopment";
import HomeLayout from "./pages/Home/HomeLayout";
import SearchedData from "./pages/SearchedData";
import Details from "./pages/ClientDetails";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastClassName="custom-toast"
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="auth/signup" element={<Signup />} />
          <Route path="auth/login" element={<Login />} />

          <Route path="/" element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="web-development" element={<Webdevelopment />} />
            <Route path="data-science" element={<DataScience />} />
            <Route path="machine-learning" element={<Machinelearning />} />
            <Route path="mobile-development" element={<MobileDevelopment />} />
            <Route path="game-development" element={<GameDevelopment />} />
            <Route path="search" element={<SearchedData />} />
            // Protected routes for client details
            <Route
              path="view-details/:title"
              element={
                <ProtectedRoute>
                  <Details />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
