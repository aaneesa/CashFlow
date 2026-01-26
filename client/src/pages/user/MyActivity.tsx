// src/pages/user/MyActivity.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { ThumbsUp, MessageSquare, ArrowLeft } from "lucide-react";

interface ActivityItem {
  _id: string;
  title: string;
  summary: string;
  slug: string;
}

interface Activity {
  liked: ActivityItem[];
  commented: ActivityItem[];
}

export default function MyActivity() {
  const [activity, setActivity] = useState<Activity>({ liked: [], commented: [] });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await api.get<Activity>("/activity"); // ✅ typed API response
        setActivity(res.data);
      } catch (err) {
        console.error("Failed to fetch activity", err);
      }
    }
    fetchActivity();
  }, []);

  return (
    <div className="min-h-screen w-full relative flex items-start justify-center px-6 py-20 font-poppins bg-white overflow-hidden">
      {/* Background Blur Circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00FF7C]/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-md h-112 bg-cyan-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-120 h-120 bg-purple-400/20 rounded-full blur-3xl -translate-x-1/2"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full m-5">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-[#1ABC9C] mb-10"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-12 tracking-tight">
          My <span className="text-[#00FF7C]">Activity</span>
        </h1>

        {/* Liked Content */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
            <ThumbsUp className="text-[#1ABC9C]" /> Liked Content
          </h2>
          {activity.liked.length === 0 ? (
            <p className="text-gray-500">No liked content yet.</p>
          ) : (
            <div className="grid gap-6">
              {activity.liked.map((c) => (
                <Link
                  key={c._id}
                  to={`/knowledge/${c.slug}`}
                  className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-md hover:shadow-lg hover:scale-[1.01] transition"
                >
                  <h3 className="font-bold text-xl text-gray-900">{c.title}</h3>
                  <p className="text-sm text-gray-700 mt-1">{c.summary}</p>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Commented Content */}
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
            <MessageSquare className="text-purple-600" /> Commented Content
          </h2>
          {activity.commented.length === 0 ? (
            <p className="text-gray-500">No commented content yet.</p>
          ) : (
            <div className="grid gap-6">
              {activity.commented.map((c) => (
                <Link
                  key={c._id}
                  to={`/knowledge/${c.slug}`}
                  className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-md hover:shadow-lg hover:scale-[1.01] transition"
                >
                  <h3 className="font-bold text-xl text-gray-900">{c.title}</h3>
                  <p className="text-sm text-gray-700 mt-1">{c.summary}</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
