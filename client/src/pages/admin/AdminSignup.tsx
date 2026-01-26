// src/pages/admin/AdminSignup.tsx
import { useState } from "react";
import type { FormEvent} from "react";
import { Link } from "react-router-dom";
import api from "../../lib/api";

export default function AdminSignup() {
  const [name, setName] = useState<string>("");      
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post("/auth/admin/register", { name, email, password });
      window.location.href = "/admin/login";
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Failed to register admin. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/95">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-black/60 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6 border border-white/10"
      >
        <h1 className="text-2xl font-extrabold text-center bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Admin Signup
        </h1>

        {/* Name input */}
        <input
          className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 font-semibold shadow hover:shadow-pink-500/30 transition"
        >
          Signup
        </button>

        <p className="text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <Link to="/admin/login" className="text-pink-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
