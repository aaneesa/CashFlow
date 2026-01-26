// src/components/ProtectedRoute.tsx

import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";


interface ProtectedRouteProps {
  children: ReactNode;
  roleRequired: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roleRequired,
}) => {
  const token: string | null = localStorage.getItem("token");
  const role: string | null = localStorage.getItem("role");

  if (!token || role !== roleRequired) {
    return (
      <Navigate
        to={roleRequired === "admin" ? "/admin/login" : "/user/login"}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
