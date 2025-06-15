
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    toast.info("Please log in to view details");
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
