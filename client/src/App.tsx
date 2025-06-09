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
import Details from "./pages/Details";

const App = () => {
  return (
    <BrowserRouter>
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
            <Route path="view-details/:title" element={<Details />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
