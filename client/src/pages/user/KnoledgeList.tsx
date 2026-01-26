// src/pages/knowledge/KnowledgeList.tsx
import { useEffect, useState, type JSX } from "react";
import { motion } from "framer-motion";
import { useUser } from "../../context/useUser";  
import api from "../../lib/api";
import {
  Search,
  BookOpen,
  Video,
//   Star,
  Eye,
  Award,
  CircleStar,
  Lightbulb,
  Map,
} from "lucide-react";
import { toast } from "react-hot-toast";

interface KnowledgeItem {
  _id: string;
  title: string;
  summary?: string;
  body?: string;
  slug: string;
  type: string | string[];
  level?: string;
  isPremium?: boolean;
  views?: number;
}

export default function KnowledgeList() {
  const { user } = useUser();

  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [q, setQ] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const fetchData = async () => {
    try {
      const { data } = await api.get<{
        items: KnowledgeItem[];
        total: number;
      }>("/contents", {
        params: { q, type, level, page, limit: 12 },
      });
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Failed to fetch contents:", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [q, type, level, page]);

  const renderTypes = (types?: string | string[]) => {
    if (!types) return null;
    return (Array.isArray(types) ? types : [types]).map((t, idx) => {
      let icon: JSX.Element | null = null;
      switch (t) {
        case "article":
          icon = <BookOpen className="w-4 h-4 text-[#00FF7C]" />;
          break;
        case "video":
          icon = <Video className="w-4 h-4 text-[#ff4a4a]" />;
          break;
        default:
          icon = null;
      }
      return (
        <span
          key={idx}
          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#F3F3F2]/50 backdrop-blur-sm shadow"
        >
          {icon} {t}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen w-full relative text-[#2F3E46] px-6 pt-28 pb-16 font-poppins">
      {/* Background with blur circles */}
      <div className="absolute inset-0 z-0 bg-linear-to-br from-white via-[#EFFFF5] to-[#DFFFEF]" />
      <div className="absolute top-32 left-16 w-64 h-64 bg-[#00FF7C]/30 blur-3xl rounded-full" />
      <div className="absolute bottom-32 right-20 w-72 h-72 bg-[#007755]/20 blur-3xl rounded-full" />

      {/* Title - Swiss Style */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mb-14">
        <h1 className="text-6xl font-extrabold tracking-tight text-[#09332C] uppercase">
          Explore Knowledge
        </h1>
        <p className="text-[#2F3E46] mt-4 text-lg font-light tracking-wide">
          Search. Filter. Discover finance resources.
        </p>
      </div>

      {/* Filters - Glass morph */}
      <div className="relative z-10 max-w-5xl mx-auto grid md:grid-cols-3 gap-5 mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-[#00FF7C] w-5 h-5" />
          <input
            placeholder="Search..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-10 w-full bg-white/40 backdrop-blur-md text-[#09332C] border border-white/30 p-3 rounded-2xl shadow-lg focus:ring-2 focus:ring-[#00FF7C] focus:outline-none"
          />
        </div>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-white/40 backdrop-blur-md text-[#09332C] border border-white/30 p-3 rounded-2xl shadow-lg focus:ring-2 focus:ring-[#00FF7C]"
        >
          <option value="">All Types</option>
          <option value="article">Article</option>
          <option value="video">Video</option>
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="bg-white/40 backdrop-blur-md text-[#09332C] border border-white/30 p-3 rounded-2xl shadow-lg focus:ring-2 focus:ring-[#00FF7C]"
        >
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Knowledge Cards */}
      <div className="relative z-10 max-w-5xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((it) => (
          <motion.a
            key={it._id}
            href={user ? `/knowledge/${it.slug}` : "#"} // if not logged in, disable link
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                toast.error("Please login to read this article");
                return;
              }
            }}
            whileHover={{ y: -6, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className={`rounded-2xl shadow-lg p-6 flex flex-col justify-between border backdrop-blur-xl hover:shadow-[#00FF7C]/40 hover:border-[#00FF7C] 
                ${it.isPremium
                  ? "bg-linear-to-br from-[#ffffff]/60 to-[#FFF8E1] border-[#FFD700]/20"
                  : "bg-white/50 border-white/40"}`}
          >
            <div className="flex flex-wrap gap-2 items-center text-xs font-semibold">
              {renderTypes(it.type)}
              {it.level && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F3F3F2]/60 backdrop-blur-sm text-[#09332C]">
                  {it.level}
                </span>
              )}
            </div>

            <div className="font-bold text-lg text-[#09332C] mt-3 leading-snug">{it.title}</div>

            <div className="text-[#2F3E46] text-xs line-clamp-3 mt-2">{it.summary || it.body}</div>

            {/* Premium / Free line separator */}
            <div className={`mt-5 mb-2 h-px rounded-full bg-[#00FF7C]/40`} />

            <div className="flex gap-2 mt-1 items-center justify-between text-xs font-semibold">
              {it.isPremium != null && (
                <span
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
                    it.isPremium
                      ? "bg-[#FFD700]/20 text-[#B8860B]"
                      : "bg-[#00FF7C]/20 text-[#09332C] backdrop-blur-sm"
                  }`}
                >
                  {it.isPremium ? (
                    <>
                      <Award size={12} />
                      Premium
                    </>
                  ) : (
                    <>
                      <CircleStar size={12} />
                      Free
                    </>
                  )}
                </span>
              )}
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E7E7E3]/60 backdrop-blur-sm text-[#09332C]">
                <Eye size={12} />
                {it.views || 0}
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Pagination */}
      <div className="relative z-10 max-w-5xl mx-auto flex items-center justify-between mt-12">
        <div className="text-sm text-[#09332C]/70">Total: {total}</div>
        <div className="flex gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-5 py-2 rounded-xl bg-linear-to-r from-[#00FF7C] to-[#007755] text-white font-semibold shadow hover:shadow-[#00FF7C]/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            disabled={items.length < 10}
            onClick={() => setPage((p) => p + 1)}
            className="px-5 py-2 rounded-xl bg-linear-to-r from-[#00FF7C] to-[#007755] text-white font-semibold shadow hover:shadow-[#00FF7C]/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Engagement Section */}
      <div className="relative z-10 max-w-5xl mx-auto mt-12 mb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Quick Tip Card */}
          <div className="p-6 rounded-2xl bg-linear-to-br from-[#F9FAFB] to-[#EFF6FF] shadow-md border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={18} className="text-[#007755]" />
              <h3 className="text-lg font-semibold text-[#09332C]">Finance Quick Tip</h3>
            </div>
            <p className="text-sm text-[#2F3E46] leading-relaxed">
              Saving just ₹100 daily at 10% annual return can grow to over ₹18 Lakhs in 20 years.
            </p>
          </div>

          {/* Roadmaps CTA Card */}
          <div className="p-6 rounded-2xl bg-linear-to-br from-[#ECFDF5] to-[#F3F3F2] shadow-md border border-gray-200 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Map size={18} className="text-[#00AA55]" />
              <h3 className="text-lg font-semibold text-[#09332C]">Explore Roadmaps</h3>
            </div>
            <p className="text-sm text-[#2F3E46] leading-relaxed mb-4">
              Structured paths to master finance concepts step by step.
            </p>
            <a
              href="/roadmap"
              className="inline-block px-4 py-2 rounded-xl bg-[#00FF7C] text-[#09332C] font-medium shadow hover:scale-105 transition"
            >
              View Roadmaps
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
