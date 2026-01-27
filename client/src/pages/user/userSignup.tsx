import React, { useState, type JSX } from "react";
import api from "../../lib/api.js";
import { Mail, Lock, User, Info } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";

// Interface for Backend Error Response
interface ApiError {
  msg?: string;
}

export default function UserSignup(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  const validateForm = (): boolean => {
    if (!name) {
      toast.error("Name is required");
      return false;
    }
    if (/\s/.test(name)) {
      toast.error("Name cannot contain spaces");
      return false;
    }
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Enter a valid email address");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must include at least 1 uppercase letter");
      return false;
    }
    if (!/[0-9]/.test(password)) {
      toast.error("Password must include at least 1 number");
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      toast.error("Password must include at least 1 special character");
      return false;
    }
    if (/^\d+$/.test(password)) {
      toast.error("Password cannot be only numbers");
      return false;
    }
    return true;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await api.post("/auth/user/register", {
        name,
        email,
        password,
        role: "user",
      });

      toast.success("Account created 🎉");
      setTimeout(() => {
        window.location.href = "/user/login";
      }, 1200);
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      toast.error(axiosError.response?.data?.msg || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center px-4 font-poppins bg-white overflow-hidden">
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Blurred Circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#00FF7C]/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/40 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      {/* Glass Morph Card */}
      <div className="relative z-10 max-w-md w-full backdrop-blur-xl bg-white/40 border border-white/60 rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-gray-900 tracking-tight">
          Create New Account
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Join <span className="text-[#00b76c] font-semibold">CashFlow</span>
        </p>

        <form onSubmit={submit} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/70 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#00b76c] focus:border-[#00b76c] outline-none transition"
              placeholder="Enter your name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              disabled={loading}
              type="text"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/70 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#00b76c] focus:border-[#00b76c] outline-none transition"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              disabled={loading}
              type="email"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/70 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#00b76c] focus:border-[#00b76c] outline-none transition"
              placeholder="Create a password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => setShowInstructions(!showInstructions)}
              className="text-sm text-[#00b76c] hover:text-[#008a55] font-medium flex items-center gap-1 ml-auto"
            >
              <Info size={16} />
              {showInstructions ? "Hide Instructions" : "Show Instructions"}
            </button>
          </div>

          {showInstructions && (
            <div className="bg-white/70 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 shadow-inner space-y-1">
              <p>Minimum 6 characters</p>
              <p>Not only numbers</p>
              <p>At least 1 uppercase letter (A–Z)</p>
              <p>At least 1 number (0–9)</p>
              <p>At least 1 special character (!@#$ etc.)</p>
              <p>No spaces allowed in name</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-[#00FF7C] to-[#00b76c] disabled:opacity-60 hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg transition transform hover:scale-[1.02]"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <button
            onClick={() => {
              window.location.href = "";
            }}
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-xl shadow-md hover:bg-gray-50 transition"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/user/login"
            className="text-[#00b76c] hover:text-[#008a55] font-medium transition"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}