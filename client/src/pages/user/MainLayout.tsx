import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = (): void => {
      const role: string | null = localStorage.getItem("role");

      // ⇝ Admin trying to access user page → redirect
      if (role === "admin") {
        navigate("/admin", { replace: true });
        return; // 🔹 prevent further execution
      }
      
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;