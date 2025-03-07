import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./stores/authStore";

interface ProtectedRouteProps {
  role?: "cliente" | "admin";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const { user } = useAuthStore();

  if (!user || (role && user.role !== role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;