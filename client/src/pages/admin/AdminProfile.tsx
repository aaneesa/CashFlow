// src/pages/admin/AdminProfile.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import LogoutButton from "../../components/LogoutButton";
import { ArrowLeft, Mail, Calendar, Shield } from "lucide-react";

// Define a type for the admin object
interface Admin {
  name: string;
  email: string;
  createdAt: string;
}

export default function AdminProfile() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const { data } = await api.get<Admin>("/admin/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmin(data);
    } catch (err) {
      console.error("Failed to fetch admin profile:", err);
      setError("Failed to fetch admin profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "admin") {
      navigate("/admin/login");
      return;
    }
    fetchProfile();
  }, [navigate]);

  if (loading) return <div className="text-center mt-20">Loading profile...</div>;
  if (error) return <div className="text-red-500 text-center mt-20">{error}</div>;

  const getInitials = (name: string | undefined): string => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .join("");
  };

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center px-6 font-poppins bg-white overflow-hidden">
      {/* Background Blur Circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#007755]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-md h-112 bg-cyan-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/2 w-120 h-120 bg-purple-400/20 rounded-full blur-3xl -translate-x-1/2"></div>

      {/* Profile Content */}
      <div className="relative z-10 max-w-5xl w-full mt-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-[#1ABC9C] mb-10"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Greeting + Username */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-10 mb-10 border-[#007755]/40">
          <div className="flex items-center gap-6">
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl
              bg-linear-to-br from-[#007755] to-[#00FF7C] ring-4 ring-[#1ABC9C]/50"
            >
              {getInitials(admin?.name)}
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
                {getGreeting()},{" "}
                <span className="font-extrabold text-[#007755]">{admin?.name}</span>
              </h1>

              <p className="mt-4 text-lg text-[#007755] font-medium italic">
                “Leadership is the capacity to translate vision into reality.”
              </p>
            </div>
          </div>
          <LogoutButton className="px-6 py-2 mt-6 sm:mt-0 rounded-xl font-semibold transition bg-red-500 hover:bg-red-600 text-white shadow-md hover:scale-105" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-2">Email</h2>
            <p className="text-xl font-medium text-gray-900 flex items-center gap-2">
              <Mail className="text-[#1ABC9C]" size={20} /> {admin?.email}
            </p>
          </div>

          <div>
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-2">Joined On</h2>
            <p className="text-xl font-medium text-gray-900 flex items-center gap-2">
              <Calendar className="text-[#1ABC9C]" size={20} />{" "}
              {admin?.createdAt && new Date(admin.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-2">Role</h2>
            <p className="text-xl font-medium text-gray-900 flex items-center gap-2">
              <Shield className="text-[#007755]" size={20} /> Super Admin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
