import React from "react";
import { motion } from "framer-motion";
import { Users, Target, TrendingUp } from "lucide-react";

const About: React.FC = () => {
  const highlights = [
    {
      icon: <Target className="w-12 h-12 text-[#00FF7C] mb-4" />,
      title: "Our Mission",
      desc: "To streamline wealth creation by providing clear, actionable financial roadmaps.",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-[#F4FF00] mb-4" />,
      title: "Our Vision",
      desc: "Building the world's most intuitive ecosystem for tracking and growing your cash flow.",
    },
    {
      icon: <Users className="w-12 h-12 text-[#007755] mb-4" />,
      title: "Community First",
      desc: "Connecting curious minds with financial experts to foster collective prosperity.",
    },
  ];

  return (
    <div className="min-h-screen w-full relative font-poppins text-[#2F3E46]">
      <div className="absolute inset-0 z-0 bg-linear-to-br from-white to-[#E9F9F2]" />

      <div className="relative z-10 py-20 md:py-28 max-w-6xl mx-auto px-6">
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            About <span className="bg-linear-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">Cashflow</span>
          </h1>
          <p className="text-lg md:text-xl font-semibold text-[#007755] mb-6">
            Smart Money Management for Modern Minds
          </p>
          <p className="text-sm md:text-base max-w-3xl mx-auto text-[#2F3E46]">
            Cashflow is built to simplify the world of finance. From complex tax laws to simple savings plans, we translate the language of money into a clear path for your future.
          </p>
        </motion.section>

        <section className="grid md:grid-cols-3 gap-10 mb-24">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-[#E7E7E3] hover:border-[#00FF7C] shadow-md hover:shadow-[#00FF7C]/20 transition-all"
            >
              {item.icon}
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-sm text-[#2F3E46]/80">{item.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Creator Card */}
        <section className="relative bg-linear-to-br from-[#0d0f10] to-[#1a1c1f] rounded-3xl p-10 border border-[#00FF7C]/20 shadow-2xl flex flex-col md:flex-row items-center gap-10 text-white">
          <img 
            // src="https://avatars.githubusercontent.com/u/000000?v=4" 
            alt="Mohit" 
            className="w-44 h-44 md:w-56 md:h-56 rounded-2xl object-cover border-2 border-[#00FF7C]/30" 
          />
          <div className="text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.2em] text-[#00FF7C] font-bold">The Architect</span>
            <h3 className="text-3xl font-bold mt-1">Mohit Dogaya</h3>
            <p className="text-gray-400 text-sm mb-4">Founder & Lead Developer</p>
            <p className="text-gray-300 leading-relaxed italic">
              "Cashflow was born out of a simple realization: everyone deserves to understand where their money goes. I built this to be the companion I wish I had when I started my financial journey."
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;