// src/pages/admin/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Check if admin is logged in
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      // redirect to admin login if not logged in as admin
      navigate("/admin/login");
    }
  }, [navigate]);

  return <main><Outlet /></main>; 
};

export default AdminLayout;
