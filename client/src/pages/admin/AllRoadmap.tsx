// src/pages/admin/AllRoadmap.tsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../lib/api";
import { Edit3, Trash2, Plus, ArrowLeft, Map } from "lucide-react";

// Define TypeScript type for Roadmap
interface Roadmap {
  _id: string;
  title: string;
  description?: string;
  level?: string;
}

export default function AllRoadmap() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/admin/login");
      return;
    }

    (async () => {
      try {
        const { data } = await api.get("/roadmaps", {
          params: { page: 1, limit: 6 },
        });
        setRoadmaps(Array.isArray(data) ? data : data.items || []);
      } catch (err) {
        console.error(err);
        setRoadmaps([]);
      }
    })();
  }, [navigate]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this roadmap?")) return;
    try {
      await api.delete(`/roadmaps/${id}`);
      setRoadmaps(roadmaps.filter((r) => r._id !== id));
      alert("Roadmap deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete roadmap");
    }
  };

  return (
    <div className="min-h-screen w-full relative text-[#2F3E46]">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(224, 255, 249, 0.6), transparent 70%), #FFFFFF",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm text-[#2F3E46] hover:text-[#1ABC9C]"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-1">Manage Roadmaps</h1>
              <p className="text-gray-600 text-sm">
                Add, edit, delete, or review roadmaps quickly.
              </p>
            </div>
          </div>

          <Link
            to="/admin/roadmap"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold shadow-md 
                       bg-linear-to-r from-[#1ABC9C] to-[#00FFE0] text-white 
                       hover:shadow-lg hover:shadow-[#1ABC9C]/30 transition duration-300"
          >
            <Plus size={18} /> Add New Roadmap
          </Link>
        </div>

        {/* Roadmap Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {roadmaps.length > 0 ? (
            roadmaps.map((it) => (
              <div
                key={it._id}
                className="group bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Title */}
                  <h3 className="font-bold text-lg text-[#2F3E46] line-clamp-2">
                    {it.title}
                  </h3>

                  {/* Badges */}
                  <div className="flex gap-2 mt-2 flex-wrap items-center pb-2 text-xs font-semibold">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E0FFF9] text-[#2F3E46]">
                      <Map size={14} className="text-[#1ABC9C]" />
                      Roadmap
                    </span>

                    {it.level && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#2F3E46]">
                        {it.level}
                      </span>
                    )}
                  </div>

                  {/* Description Preview */}
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {it.description?.substring(0, 120) ||
                      "No description available..."}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex gap-3">
                    <Link
                      to={`/roadmaps/${it._id}`}
                      className="text-[#1ABC9C] hover:text-[#16A085] flex items-center gap-1 text-sm"
                    >
                      <Edit3 size={16} /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(it._id)}
                      className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full mt-4">
              No roadmaps found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
