import Signup from "@/components/ui/header/Signup";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="auth/signup" element={<Signup />} />
      <Route path="auth/login" element={<div>Login</div>} />
    </Routes>
  );
};

export default AppRoutes;
