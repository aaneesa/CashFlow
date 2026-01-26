// src/pages/Home.tsx
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Wrench,
  Star,
  Map,
  Users,
  Rocket,
  Sparkles,
  Lightbulb,
  HelpCircle,
  BookMarked,
  Crown,
  Heart,
  MessageSquare,
  Eye,
  Megaphone,
  CheckCircle,
  XCircle,
  NotebookPen,
  ListTodo,
} from "lucide-react";
import TaglineScroll from "../../components/TaglineScroll";
import type { JSX } from "react";

interface Feature {
  icon: JSX.Element;
  title: string;
  desc: string;
}

interface Stat {
  title: string;
  value: string;
}

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const features: Feature[] = [
    {
      icon: (
        <div className="relative mb-4">
          <Sparkles className="w-12 h-12 text-[#7a1f6c]" />
          <span className="absolute -top-2 -right-4 bg-linear-to-r from-[#FF6B00] to-[#FF3C3C] text-white text-xs px-2 py-0.5 rounded-full shadow-md font-semibold">
            New
          </span>
        </div>
      ),
      title: "AI Article Summaries",
      desc: "Get instant AI-generated summaries of articles — save time and learn smarter.",
    },
    {
      icon: <BookOpen className="w-12 h-12 text-[#007755] mb-4" />,
      title: "Easy Articles & Videos",
      desc: "Clear step-by-step finance lessons explained in simple language.",
    },
    {
      icon: <Map className="w-12 h-12 text-[#7c3338] mb-4" />,
      title: "Learning Roadmaps",
      desc: "Structured paths for saving, investing, and career growth.",
    },
    {
      icon: <Wrench className="w-12 h-12 text-[#d99e5a] mb-4" />,
      title: "Smart Tools",
      desc: "EMI, SIP, FD & retirement calculators to manage money practically.",
    },
    {
      icon: <Star className="w-12 h-12 text-[#3ea5b5] mb-4" />,
      title: "Practical Insights",
      desc: "Real case studies and expert strategies made easy to understand.",
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-[#dd5b3b] mb-4" />,
      title: "Easy to Learn",
      desc: "Beginner-friendly explanations with examples anyone can follow.",
    },
    {
      icon: <Rocket className="w-12 h-12 text-[#1e9055] mb-4" />,
      title: "Grow Faster",
      desc: "Boost your confidence in money matters with guided learning.",
    },
    {
      icon: (
        <div className="flex gap-3 mb-4">
          <Heart className="w-8 h-8 text-[#d3445e]" />
          <MessageSquare className="w-8 h-8 text-[#3667a0]" />
          <Eye className="w-8 h-8 text-[#3bc27c]" />
        </div>
      ),
      title: "My Activity",
      desc: "Track your likes, comments, and visited content all in one place.",
    },
  ];

  const comingSoon: Feature[] = [
    {
      icon: <HelpCircle className="w-12 h-12 text-[#334a64] mb-4" />,
      title: "Finance Quizzes",
      desc: "Test your knowledge with interactive finance quizzes.",
    },
    {
      icon: <BookMarked className="w-12 h-12 text-[#7e673a] mb-4" />,
      title: "Book Suggestions",
      desc: "Curated finance books to level up your knowledge.",
    },
    {
      icon: <Users className="w-12 h-12 text-[#388367] mb-4" />,
      title: "Community Support",
      desc: "Learn with peers, share doubts, and grow together.",
    },
    {
      icon: <NotebookPen className="w-12 h-12 text-[#b48b6f] mb-4" />,
      title: "Notes",
      desc: "Create, view, edit, and delete your personal finance notes.",
    },
    {
      icon: <ListTodo className="w-12 h-12 text-[#707882] mb-4" />,
      title: "To-Do List",
      desc: "Stay organized with a simple finance-focused task manager.",
    },
  ];

  const stats: Stat[] = [
    { title: "Learners", value: "1500+" },
    { title: "Articles", value: "350+" },
    { title: "Tools", value: "24+" },
  ];

  const handlePlanClick = () => {
    if (!token) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen w-full relative font-poppins text-[#2F3E46]">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-linear-to-br from-white to-[#E9F9F2]">
        <div className="absolute w-72 h-72 bg-[#00FF7C]/20 blur-3xl rounded-full top-20 left-10"></div>
        <div className="absolute w-96 h-96 bg-[#007755]/20 blur-3xl rounded-full bottom-10 right-10"></div>
      </div>

      <div className="relative z-10 pt-28 max-w-7xl mx-auto px-6">

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center px-4 py-2 bg-linear-to-r from-[#00FF7C]/10 to-[#007755]/10 border border-[#00FF7C]/20 rounded-full text-[#007755] text-sm font-medium m-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            CashFlow – Clarity that Builds Prosperity.
          </span>

          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
            Master Finance <br />
            <span className="bg-linear-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">
              The Modern Way
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Build clarity in finance with{" "}
            <span className="text-[#007755] font-semibold">easy guides, real tools, and practical case studies</span>.
            No jargon, just knowledge that works for you.
          </p>
          <Link
            to="/knowledge"
            className="px-8 py-4 bg-[#6abb91] text-[#09332C] hover:bg-[#567b68] rounded-3xl text-lg font-semibold shadow-lg hover:shadow-[#00FF7C]/50 transition"
          >
            Start Learning
          </Link>
        </motion.section>

        <TaglineScroll />

        {/* Stats Section */}
        <section className="flex justify-center gap-10 mb-24 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col bg-white/50 backdrop-blur-lg rounded-2xl p-8 min-w-30 shadow-md"
            >
              <span className="text-3xl font-bold text-[#007755]">{s.value}</span>
              <span className="text-sm font-medium">{s.title}</span>
            </motion.div>
          ))}
        </section>

        {/* Features */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-linear-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">
              What You’ll Get
            </span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`group backdrop-blur-lg bg-white/70 rounded-2xl p-8 border border-[#00FF7C]/20 
          hover:border-[#007755] shadow-md hover:shadow-[#00FF7C]/40 
          transition-transform transform hover:-translate-y-2 
          ${i === features.length - 1 ? "flex flex-col justify-center col-span-2 text-center items-center" : ""}`}
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-[#2F3E46]">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="w-16 h-1 bg-linear-to-r from-[#00FF7C] to-[#007755] m-16 rounded-full mx-auto md:mx-0"></div>

        {/* Inspiration / Quote Section */}
        <section className="my-24">
          <div className="relative backdrop-blur-xl bg-linear-to-br from-[#0d0f10] to-[#1a1c1f] rounded-3xl p-10 md:p16 border border-[#00FF7C]/20 shadow-2xl max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 text-white">

            {/* Left: Image */}
            <div className="shrink-0 relative">
              <img
                src="https://wallpapercave.com/wp/wp4251194.jpg"
                alt="Warren Buffett"
                className="w-44 h-44 md:w-60 md:h-60 rounded-2xl object-cover shadow-lg border-4 border-[#1a1c1f]"
              />

              {/* Floating Quote Mark */}
              <div className="absolute -top-6 -left-6 text-7xl md:text-8xl text-[#00FF7C]/15 font-serif select-none">
                “
              </div>
            </div>

            {/* Right: Text */}
            <div className="text-center md:text-left max-w-2xl">
              {/* Label */}
              <span className="text-sm uppercase tracking-widest text-[#00FF7C] font-semibold">
                Inspiration
              </span>

              {/* Name */}
              <h3 className="text-3xl md:text-4xl font-bold mt-2 text-white">
                Warren Buffett
              </h3>

              {/* Role Line */}
              <p className="text-sm text-gray-400 mb-4">
                Investor • Philanthropist • Mentor
              </p>

              {/* Quote */}
              <p className="italic text-lg md:text-xl text-gray-200 leading-relaxed mb-6">
                “The best investment you can make is in yourself.”
              </p>

              {/* Divider */}
              <div className="w-16 h-1 bg-linear-to-r from-[#00FF7C] to-[#007755] mb-6 rounded-full mx-auto md:mx-0"></div>

              {/* Extra Line for Motivation */}
              <p className="text-sm md:text-base text-gray-400">
                Known as the “Oracle of Omaha”, Buffett inspires learners to build
                wealth with patience, discipline, and clarity — exactly what Fynsd
                stands for.
              </p>
            </div>
          </div>
        </section>


        {/* Divider */}
        <div className="w-6 h-1 bg-linear-to-r from-[#00FF7C] to-[#007755]/40 m-16 rounded-full mx-auto md:mx-0"></div>


        {/* Coming Soon + Advertise */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-linear-to-r from-[#007755] to-[#00FF7C] bg-clip-text text-transparent">
              Exciting Features
            </span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {comingSoon.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative group backdrop-blur-lg bg-white/70 rounded-2xl p-8 border border-gray-300 hover:border-[#007755] shadow-md hover:shadow-[#007755]/40 transition-transform transform hover:-translate-y-2"
              >
                <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-linear-to-r from-[#FF7B00] to-[#FF3C3C] text-white shadow-md">
                  Coming Soon
                </span>
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-[#2F3E46]">{feature.desc}</p>
              </motion.div>
            ))}

            {/* Advertise Card */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative group backdrop-blur-lg bg-white/80 rounded-2xl p-8 border border-[#00FF7C]/20 shadow-md hover:shadow-[#00FF7C]/40 transition-transform transform hover:-translate-y-2"
            >
              <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-linear-to-r from-[#00FF7C] to-[#007755] text-white shadow-md">
                Feature
              </span>
              <Megaphone className="w-12 h-12 text-[#007755] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Advertise with Us</h3>
              <p className="text-sm text-[#2F3E46] mb-4">
                Promote your brand to learners, investors, and startups through impactful placements.
              </p>
              <Link
                to="/advertise"
                className="px-6 py-2 bg-[#00FF7C] text-[#09332C] rounded-xl font-semibold text-sm shadow-md hover:shadow-[#00FF7C]/50 transition"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-linear-to-r from-[#FFB800] to-[#FF6B00] bg-clip-text text-transparent">
              Plans & Pricing
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Free Plan */}
            <div
              onClick={handlePlanClick}
              className="cursor-pointer backdrop-blur-lg bg-white/70 rounded-2xl p-8 border border-[#00FF7C]/20 shadow-md hover:shadow-[#00FF7C]/40 transition duration-300"
            >
              <h3 className="text-2xl font-bold mb-4">Free Plan</h3>
              <ul className="space-y-3 text-sm text-[#2F3E46]">
                <li className="relative flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0077FF]" />
                  <span>AI Article Summaries</span>
                  <span className="ml-2 bg-linear-to-r from-[#FF6B00] to-[#FF3C3C] text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                    New
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#00B86B]" /> Access to articles & videos
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#00B86B]" /> Roadmaps & tools
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#00B86B]" /> Practical insights
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-400" /> No quizzes
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-400" /> No community
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-400" /> Limited support
                </li>
              </ul>
              <p className="mt-12 text-3xl font-bold text-[#007755]">₹0</p>

            </div>

            {/* Premium Plan */}
            <div
              onClick={handlePlanClick}
              className="cursor-pointer relative backdrop-blur-lg bg-linear-to-br from-[#FFF1D6]/80 to-[#FFE8C5] rounded-2xl p-8 border border-[#FFAA00]/40 shadow-lg hover:shadow-[#FFAA00]/50 transition duration-300"
            >
              <span className="absolute -top-3 right-5 bg-[#FFAA00] text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                Best Value
              </span>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Crown className="w-6 h-6 text-[#FFAA00] mr-2" /> Premium Plan
              </h3>
              <ul className="space-y-3 text-sm text-[#2F3E46]">
                <li className="relative flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0077FF]" />
                  <span>AI Article Summaries</span>
                  <span className="ml-2 bg-linear-to-r from-[#FF6B00] to-[#FF3C3C] text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                    New
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#FF6B00]" /> Everything in Free
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#FF6B00]" /> Quizzes & certification
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#FF6B00]" /> Community support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#FF6B00]" /> Book suggestions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#FF6B00]" /> Priority support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#FF6B00]" /> Early access to new content
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#FF6B00]" /> Exclusive finance case studies
                </li>
              </ul>
              <p className="mt-6 text-3xl font-bold text-[#FF6B00]">₹499/year</p>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mt-16 pb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">
            Start Exploring Finance with Clarity
          </h2>
          <p className="text-[#2F3E46] mb-6">
            Read simple, practical articles to build money confidence and better decisions.
          </p>
          <Link
            to="/knowledge"
            className="px-8 py-4 bg-[#00FF7C] text-[#09332C] hover:bg-[#00e671] rounded-2xl text-lg font-semibold shadow-lg hover:shadow-[#00FF7C]/40 transition"
          >
            Explore Articles
          </Link>
        </section>

      </div>
    </div>
  );
};
