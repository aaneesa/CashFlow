// src/pages/user/UserProfile.tsx
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/useUser.ts";
import LogoutButton from "../../components/LogoutButton";
import { ArrowLeft, Mail, Calendar, Crown, X } from "lucide-react";
import UpgradeButton from "../../components/UpgradeButton";
import { useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  isPremium: boolean;
}

export default function UserProfile() {
  const { user } = useUser() as { user: User | null }; // ✅ typed context
  const navigate = useNavigate();
  const [showPerks, setShowPerks] = useState<boolean>(false);

  if (!user) {
    return <div className="text-center mt-20">Loading profile...</div>;
  }

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .join("");
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center px-6 font-poppins bg-white overflow-hidden">
      {/* Background Blur Circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00FF7C]/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-md h-112 bg-cyan-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/2 w-120 h-120 bg-purple-400/20 rounded-full blur-3xl -translate-x-1/2"></div>

      {/* Profile Content */}
      <div className="relative z-10 max-w-5xl w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-[#1ABC9C] mb-10"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Greeting + Username */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-10 mb-10 
          ${user?.isPremium ? "border-yellow-400/40" : "border-gray-300"}`}
        >
          <div className="flex items-center gap-6">
            <div
              className={`w-28 h-28 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl 
              ${user?.isPremium
                  ? "bg-linear-to-br from-yellow-400 to-yellow-600 ring-4 ring-yellow-300"
                  : "bg-linear-to-br from-[#00FF7C] to-[#1ABC9C]"}`}
            >
              {getInitials(user?.name)}
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
                {getGreeting()},{" "}
                <span
                  className={`font-extrabold ${user?.isPremium ? "text-yellow-600" : "text-[#00FF7C]"}`}
                >
                  {user?.name}
                </span>
              </h1>

              {user?.isPremium && (
                <p className="mt-4 text-lg text-yellow-700 font-medium italic">
                  “Knowledge distinguishes the ordinary from the extraordinary.”
                </p>
              )}
            </div>
          </div>
          <LogoutButton className="px-6 py-2 mt-6 sm:mt-0 rounded-xl font-semibold transition bg-red-500 hover:bg-red-600 text-white shadow-md hover:scale-105" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-2">
              Email
            </h2>
            <p className="text-xl font-medium text-gray-900 flex items-center gap-2">
              <Mail className="text-[#1ABC9C]" size={20} /> {user?.email}
            </p>
          </div>

          <div>
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-2">
              Member Since
            </h2>
            <p className="text-xl font-medium text-gray-900 flex items-center gap-2">
              <Calendar className="text-[#1ABC9C]" size={20} />{" "}
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-2">
              Status
            </h2>
            <p className="text-xl font-medium text-gray-900 flex items-center gap-2">
              <Crown
                className={user?.isPremium ? "text-yellow-500" : "text-gray-400"}
                size={20}
              />
              {user?.isPremium ? "Premium Member" : "Free User"}
            </p>
            {!user?.isPremium && (
              <div className="mt-3">
                <UpgradeButton userId={user?._id} />
              </div>
            )}
            {user?.isPremium && (
              <button
                onClick={() => setShowPerks(true)}
                className="mt-3 px-5 py-2 rounded-xl bg-linear-to-r from-yellow-400 to-yellow-600 text-white font-semibold shadow-md hover:scale-105 transition"
              >
                View Premium Perks
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Premium Modal */}
      {showPerks && (
        <div className="fixed inset-0 flex items-center justify-center bg-linear-to-br from-black/10 via-gray-900/30 to-black/10 backdrop-blur-[6px] z-50">
          <div className="relative w-[90%] max-w-3xl rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl p-10">
            {/* Close Button */}
            <button
              onClick={() => setShowPerks(false)}
              className="absolute top-4 right-4 text-gray-700 hover:text-yellow-600 transition"
            >
              <X size={28} />
            </button>

            <h2 className="text-4xl font-bold text-yellow-500 mb-10 text-center tracking-tight">
              PREMIUM PERKS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <Crown className="text-yellow-500 mb-3" size={32} />
                <p className="font-semibold text-gray-900">Unlimited Access</p>
                <p className="text-sm text-gray-700">
                  Unlock all courses, notes & exclusive features.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Calendar className="text-yellow-500 mb-3" size={32} />
                <p className="font-semibold text-gray-900">Early Features</p>
                <p className="text-sm text-gray-700">
                  Be the first to try new updates before anyone else.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Mail className="text-yellow-500 mb-3" size={32} />
                <p className="font-semibold text-gray-900">Priority Support</p>
                <p className="text-sm text-gray-700">
                  Get faster help & priority assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
