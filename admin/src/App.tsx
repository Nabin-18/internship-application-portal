import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import UploadPost from "./components/pages/UploadPost";
import Dashboard from "./components/pages/Dashboard";
import SearchedData from "./components/pages/SearchedData";
import ClientData from "./components/pages/ClientData";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="create-post" element={<UploadPost />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="search" element={<SearchedData />} />
          <Route path="client-data" element={<ClientData />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
