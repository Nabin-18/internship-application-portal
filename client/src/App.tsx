// import { Outlet } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import Signup from "./components/header/Signup";
import Login from "./components/header/Login";
import Webdevelopment from "./pages/Home/sidebar/Webdevelopment";
import MobileDevelopment from "./pages/Home/sidebar/MobileDevelopment";
import Machinelearning from "./pages/Home/sidebar/Machinelearning";
import DataScience from "./pages/Home/sidebar/DataScience";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/web-development" element={<Webdevelopment />} />
            <Route path="/machine-learning" element={<Machinelearning />} />
            <Route path="/data-science" element={<DataScience />} />
            <Route path="/mobile-development" element={<MobileDevelopment />} />
            {/* <Route path="/game-development" element={<GameDevelopment /> /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
