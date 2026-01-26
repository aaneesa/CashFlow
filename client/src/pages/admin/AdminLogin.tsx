import React, { useState } from "react";
import type {FormEvent} from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api.js";

// 1. Define the expected Login Response
interface LoginResponse {
  token: string;
  role: string;
  msg?: string;
}

export default function AdminLogin(): React.JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const navigate = useNavigate();

  const submit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Use generic to type the API response
      const { data } = await api.post<LoginResponse>("/auth/admin/login", { 
        email, 
        password 
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "admin");
      
      // Using navigate instead of window.location for a smoother SPA transition
      navigate("/admin");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err.response?.data?.msg || "Login failed. Please check your credentials.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/95 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-black/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6 border border-white/10"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Portal
          </h1>
          <p className="text-gray-500 text-sm">Secure access for administrators</p>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center animate-in fade-in slide-in-from-top-1">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 ml-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
              placeholder="admin@example.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 ml-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Verifying...
            </span>
          ) : (
            "Sign In"
          )}
        </button>

        <div className="pt-2 text-center">
          <button 
            type="button"
            onClick={() => navigate("/")}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Return to Main Website
          </button>
        </div>
      </form>
    </div>
  );
}