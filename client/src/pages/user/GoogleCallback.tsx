import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../lib/api";

// --- Interfaces ---

interface UserProfileResponse {
  isPremium: boolean;
  name?: string;
  email?: string;
  _id?: string;
}

const GoogleCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token: string | null = params.get("token");

    if (token) {
      // Store credentials
      localStorage.setItem("token", token);
      localStorage.setItem("role", "user");

      // 👇 Fetch profile to update isPremium and sync state
      api.get<UserProfileResponse>("/user/profile", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(({ data }) => {
          localStorage.setItem("isPremium", data.isPremium ? "true" : "false");
          toast.success("Google login successful 🎉");
          
          setTimeout(() => navigate("/"), 1200);
        })
        .catch((error: unknown) => {
          console.error("Profile fetch error:", error);
          toast.error("Failed to fetch profile");
          navigate("/user/login");
        });
    } else {
      toast.error("Google login failed. Try again.");
      navigate("/user/login");
    }
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center text-lg font-semibold text-gray-700">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-[#00FF7C] border-t-transparent rounded-full animate-spin"></div>
        Processing Google Login...
      </div>
    </div>
  );
};

export default GoogleCallback;