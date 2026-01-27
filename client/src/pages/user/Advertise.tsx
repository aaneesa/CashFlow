// src/pages/user/Advertise.tsx
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdPlacement {
  title: string;
  desc: string;
}

export default function Advertise() {
  const navigate = useNavigate();

  const adPlacements: AdPlacement[] = [
    { title: "Left Sidebar Banner", desc: "Visible on learning pages" },
    { title: "Right Sidebar Banner", desc: "Great for highlighting tools" },
    { title: "Footer Banner", desc: "Perfect for call-to-action ads" },
  ];

  return (
    <div className="relative min-h-screen py-20 px-6 bg-linear-to-br from-[#F5F5F5] to-[#E9F9F2]">
      {/* Background Blur / Glow */}
      <div className="absolute inset-0 -z-10 bg-white/10 backdrop-blur-lg" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-16">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#00FF7C] transition"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-800">
            Advertise with{" "}
            <span className="bg-linear-to-r from-[#00FF7C] to-[#1d814d] bg-clip-text text-transparent">
              CashFlow
            </span>
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Connect with <span className="font-semibold">finance learners, investors, and startups</span> through impactful ad placements. Grow with a community shaping the future of finance.
          </p>
        </motion.div>

        {/* Why Advertise */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="p-10 rounded-3xl border border-[#00FF7C]/20 bg-white/90 shadow-lg"
        >
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-gray-800 mb-6">
            Why Advertise Here?
          </h2>
          <ul className="space-y-3 text-gray-700 font-medium list-disc list-inside">
            <li>🎯 Targeted exposure to finance-savvy learners & professionals</li>
            <li>📈 Boost visibility for startups, courses & financial products</li>
            <li>💡 Affordable and flexible plans designed for all business sizes</li>
          </ul>
        </motion.div>

        {/* Ad Placement Options */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="p-10 rounded-3xl border border-[#00FF7C]/20 bg-white/90 shadow-lg"
        >
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-gray-800 mb-10">
            Ad Placement Options
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {adPlacements.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#00FF7C]/10 shadow-md hover:shadow-lg transition"
              >
                <h3 className="font-bold text-lg text-gray-800 mb-2 uppercase">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          whileHover={{ scale: 1.005 }}
          className="p-10 rounded-3xl border border-[#00FF7C]/20 bg-white/95 shadow-lg space-y-8"
        >
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-gray-800">
            Get in Touch
          </h2>
          <form className="grid gap-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 rounded-xl border border-[#00FF7C]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#00FF7C]"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 rounded-xl border border-[#00FF7C]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#00FF7C]"
            />
            <textarea
              placeholder="Tell us about your ad requirements"
              className="w-full p-4 rounded-xl border border-[#00FF7C]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#00FF7C]"
              rows={4}
            ></textarea>
            <button
              type="submit"
              className="w-full py-4 rounded-3xl font-semibold text-lg
                         bg-linear-to-r from-[#00FF7C] to-[#1d814d]
                         text-[#09332C] shadow-lg hover:shadow-[#00FF7C]/50 transition-all"
            >
              Submit Request
            </button>
          </form>

          <p className="text-sm text-gray-700 text-center">
            Prefer direct contact? Email us at{" "}
            <a
              href="mailto:advertise@cashflow.com"
              className="text-[#00FF7C] font-semibold"
            >
              advertise@cashflow.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
