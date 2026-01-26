import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../lib/api";
import { Users, BookOpen, Map, Plus, User,  LayoutDashboard } from "lucide-react";
import LogoutButton from "../../components/LogoutButton";

// Define interfaces for better type safety
interface UserData {
  _id: string;
  isPremium: boolean;
}

interface Content {
  _id: string;
  title: string;
  status: "published" | "draft";
  isPremium: boolean;
  type: string[] | string;
}

interface Roadmap {
  _id: string;
  title: string;
  description?: string;
}

interface Stats {
  users: { total: number; free: number; premium: number };
  contents: {
    total: number;
    published: number;
    draft: number;
    free: number;
    premium: number;
  };
  roadmaps: { total: number };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    users: { total: 0, free: 0, premium: 0 },
    contents: { total: 0, published: 0, draft: 0, free: 0, premium: 0 },
    roadmaps: { total: 0 },
  });

  const [latestContent, setLatestContent] = useState<Content[]>([]);
  const [latestRoadmaps, setLatestRoadmaps] = useState<Roadmap[]>([]);
  const [activeTab, setActiveTab] = useState<"content" | "roadmaps">("content");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const adminName = localStorage.getItem("name") || "Admin";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    if (!token || role !== "admin") {
      navigate("/admin/login");
      return;
    }

    // Run all fetches in parallel for better performance
    const initDashboard = async () => {
      setLoading(true);
      await Promise.all([
        // eslint-disable-next-line react-hooks/immutability
        fetchStats(),
        // eslint-disable-next-line react-hooks/immutability
        fetchLatestContent(),
        // eslint-disable-next-line react-hooks/immutability
        fetchLatestRoadmaps()
      ]);
      setLoading(false);
    };

    initDashboard();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      // Helper to extract array regardless of wrapper
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const getData = (res: any) => Array.isArray(res.data) ? res.data : res.data?.items || [];

      const [uRes, cRes, rRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/contents"),
        api.get("/roadmaps")
      ]);

      const users: UserData[] = getData(uRes);
      const contents: Content[] = getData(cRes);
      const roadmaps: Roadmap[] = getData(rRes);

      setStats({
        users: {
          total: users.length,
          free: users.filter(u => !u.isPremium).length,
          premium: users.filter(u => u.isPremium).length,
        },
        contents: {
          total: contents.length,
          published: contents.filter(c => c.status === "published").length,
          draft: contents.filter(c => c.status === "draft").length,
          free: contents.filter(c => !c.isPremium).length,
          premium: contents.filter(c => c.isPremium).length,
        },
        roadmaps: {
          total: roadmaps.length,
        },
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchLatestContent = async () => {
    try {
      const res = await api.get("/admin/contents", {
        params: { limit: 6, sort: "-createdAt" },
      });
      const items = Array.isArray(res.data) ? res.data : res.data.items || [];
      setLatestContent(items.slice(0, 6));
    } catch (error) {
      console.error("Error fetching latest content:", error);
    }
  };

  const fetchLatestRoadmaps = async () => {
    try {
      const res = await api.get("/roadmaps", {
        params: { limit: 6, sort: "-createdAt" },
      });
      const items = Array.isArray(res.data) ? res.data : res.data.items || [];
      setLatestRoadmaps(items.slice(0, 6));
    } catch (error) {
      console.error("Error fetching latest roadmaps:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative text-[#2F3E46] px-6 pt-20 pb-16 overflow-x-hidden font-poppins">
      <div className="absolute inset-0 z-0 bg-linear-to-br from-white to-[#f0fdf4]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
                <LayoutDashboard size={32} />
             </div>
             <div>
                <h1 className="text-3xl font-bold">
                  Hello, <span className="text-emerald-600">{adminName}</span>
                </h1>
                <p className="text-gray-500">Platform overview and management</p>
             </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin/profile")}
              className="bg-white hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 border border-gray-200 shadow-sm transition-all"
            >
              <User size={18} /> Profile
            </button>
            <LogoutButton className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all" />
          </div>
        </header>

        {/* Stats Row */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatsCard title="Total Users" value={stats.users.total} subtext={`💎 ${stats.users.premium} Premium`} color="emerald" />
          <StatsCard title="Total Content" value={stats.contents.total} subtext={`📝 ${stats.contents.published} Published`} color="blue" />
          <StatsCard title="Roadmaps" value={stats.roadmaps.total} subtext="Learning Paths" color="purple" />
        </div>

        {/* Quick Actions */}
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 ml-1">Management</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          <ActionLink icon={<Users />} label="Users" to="/admin/users" />
          <ActionLink icon={<BookOpen />} label="Content" to="/admin/contents" />
          <ActionLink icon={<Map />} label="Roadmaps" to="/admin/roadmaps" />
          <ActionLink icon={<Plus />} label="New Content" to="/admin/content/new" highlight />
          <ActionLink icon={<Plus />} label="New Roadmap" to="/admin/roadmap" highlight />
        </div>

        {/* Latest Tabs */}
        <div className="bg-white rounded-3xl border border-gray-100 p-2 shadow-sm mb-12">
          <div className="flex p-2 gap-2">
            <TabButton active={activeTab === "content"} onClick={() => setActiveTab("content")} label="Latest Content" />
            <TabButton active={activeTab === "roadmaps"} onClick={() => setActiveTab("roadmaps")} label="Latest Roadmaps" />
          </div>

          <div className="p-4">
            {activeTab === "content" ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {latestContent.map((it) => (
                  <ContentCard key={it._id} item={it} />
                ))}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {latestRoadmaps.map((roadmap) => (
                  <RoadmapCard key={roadmap._id} roadmap={roadmap} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components for cleaner JSX
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StatsCard({ title, value, subtext, color }: any) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-5 rounded-full bg-${color}-500`} />
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-tight mb-1">{title}</h3>
      <p className="text-4xl font-black text-gray-800 mb-2">{value}</p>
      <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-md">{subtext}</p>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ActionLink({ icon, label, to, highlight }: any) {
  return (
    <Link to={to} className={`flex flex-col items-center justify-center p-6 rounded-3xl border transition-all hover:scale-105 ${highlight ? 'bg-emerald-600 text-white border-emerald-600 shadow-emerald-200 shadow-lg' : 'bg-white text-gray-700 border-gray-100 hover:border-emerald-200'}`}>
      <span className={highlight ? 'text-white' : 'text-emerald-500'}>{icon}</span>
      <span className="mt-3 font-bold text-sm">{label}</span>
    </Link>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TabButton({ active, onClick, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 px-6 rounded-2xl font-bold text-sm transition-all ${active ? 'bg-emerald-50 text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
    >
      {label}
    </button>
  );
}

function ContentCard({ item }: { item: Content }) {
  return (
    <div className="group bg-gray-50/50 hover:bg-white p-5 rounded-2xl border border-transparent hover:border-emerald-100 transition-all">
      <div className="flex justify-between items-start mb-3">
         <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${item.status === 'published' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-500'}`}>
           {item.status}
         </span>
         {item.isPremium && <span className="text-xs">💎</span>}
      </div>
      <h3 className="font-bold text-gray-800 line-clamp-1 mb-2 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
      <Link to={`/admin/content/${item._id}`} className="text-xs font-bold text-emerald-500 uppercase tracking-tighter hover:underline">Edit Content</Link>
    </div>
  );
}

function RoadmapCard({ roadmap }: { roadmap: Roadmap }) {
  return (
    <div className="group bg-gray-50/50 hover:bg-white p-5 rounded-2xl border border-transparent hover:border-emerald-100 transition-all">
      <h3 className="font-bold text-gray-800 line-clamp-1 mb-1">{roadmap.title}</h3>
      <p className="text-xs text-gray-500 line-clamp-2 mb-4">{roadmap.description || "No description provided."}</p>
      <Link to={`/admin/roadmap/${roadmap._id}`} className="text-xs font-bold text-emerald-500 uppercase tracking-tighter hover:underline">Edit Path</Link>
    </div>
  );
}