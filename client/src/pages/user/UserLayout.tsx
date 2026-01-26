// src/pages/user/UserLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useUser } from "../../context/useUser.ts";

export default function UserLayout() {
  const { loading } = useUser() as { loading: boolean }; // ✅ typed context

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
