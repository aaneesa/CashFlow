// src/pages/user/Advertise.tsx
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import type { ReactNode } from "react";

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
    <div className="relative min-h-screen py-20 px-6 bg-linear-to-br from-[#F5F5F5] to-[#E9DCC9]">
      {/* Glass Morph Background Overlay */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/30" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-16">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-[#00FF7C] transition mb-8"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-[#171614]">
            Advertise with{" "}
            <span className="text-[#00FF7C] font-extrabold">Fynsd</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Connect with{" "}
            <span className="font-semibold">
              finance learners, investors, and startups
            </span>{" "}
            through impactful ad placements. Grow with a community shaping the
            future of finance.
          </p>
        </motion.div>

        {/* Why Advertise */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="p-10 rounded-3xl border border-[#E5E5E5]/40 bg-white/50 backdrop-blur-md shadow-lg"
        >
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-[#171614] mb-6">
            Why Advertise Here?
          </h2>
          <ul className="space-y-3 text-gray-700 font-medium">
            <li>🎯 Targeted exposure to finance-savvy learners & professionals</li>
            <li>📈 Boost visibility for startups, courses & financial products</li>
            <li>💡 Affordable and flexible plans designed for all business sizes</li>
          </ul>
        </motion.div>

        {/* Placement Options */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="p-10 rounded-3xl border border-[#E5E5E5]/40 bg-white/50 backdrop-blur-md shadow-lg"
        >
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-[#171614] mb-10">
            Ad Placement Options
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {adPlacements.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-[#E5E5E5]/30 shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-bold text-lg text-[#171614] mb-2 uppercase">
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
          className="p-10 rounded-3xl border border-[#E5E5E5]/40 bg-white/60 backdrop-blur-xl shadow-lg space-y-8"
        >
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-[#171614]">
            Get in Touch
          </h2>
          <form className="grid gap-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-xl border border-[#E5E5E5]/40 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#00FF7C]"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-xl border border-[#E5E5E5]/40 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#00FF7C]"
            />
            <textarea
              placeholder="Tell us about your ad requirements"
              className="w-full p-3 rounded-xl border border-[#E5E5E5]/40 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#00FF7C]"
              rows={4}
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold uppercase tracking-wide text-[#171614] bg-[#00FF7C] hover:bg-[#00e671] shadow-md hover:shadow-[#00FF7C]/40 transition-all"
            >
              Submit Request
            </button>
          </form>

          <p className="text-sm text-gray-700 text-center">
            Prefer direct contact? Email us at{" "}
            <a
              href="mailto:advertise@fynsd.com"
              className="text-[#00FF7C] font-semibold"
            >
              advertise@fynsd.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
