import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../lib/api";
import {
  Edit3,
  Trash2,
  Plus,
  ArrowLeft,
  FileText,
  Video,
  Star,
  Eye,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// 1. Define the Content Interface
interface ContentItem {
  _id: string;
  title: string;
  type: ("article" | "video")[];
  level?: string;
  status: "published" | "draft";
  summary?: string;
  body?: string;
  isPremium: boolean;
  views?: number;
}

interface ApiResponse {
  items: ContentItem[];
  total?: number;
}

export default function AllContents(): React.JSX.Element {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/admin/login");
      return;
    }

    const fetchContents = async () => {
      try {
        setLoading(true);
        const { data } = await api.get<ApiResponse>("/admin/contents", {
          params: { page: 1, limit: 50 },
        });
        setContents(Array.isArray(data.items) ? data.items : []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load contents");
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, [navigate]);

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await api.delete(`/admin/contents/content/${id}`);
      setContents((prev) => prev.filter((c) => c._id !== id));
      toast.success("Content deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete content");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen w-full relative text-[#2F3E46]">
      <Toaster position="top-right" />

      {/* Background Layer */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(224, 255, 249, 0.4), transparent 70%), #FFFFFF",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#1ABC9C] transition-colors"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-1">Manage Content</h1>
              <p className="text-gray-500 text-sm">
                Add, edit, delete, or review content quickly.
              </p>
            </div>
          </div>

          <Link
            to="/admin/content/new"
            className="inline-flex items-center gap-2 bg-linear-to-r from-[#1ABC9C] to-[#00FFE0] hover:opacity-90 px-5 py-2 rounded-xl text-sm font-medium text-white shadow transition-all"
          >
            <Plus size={18} /> Add New Content
          </Link>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1ABC9C]"></div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contents.length > 0 ? (
              contents.map((it) => (
                <div
                  key={it._id}
                  className="group bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 p-5 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-lg text-[#2F3E46] line-clamp-2 group-hover:text-[#1ABC9C] transition">
                      {it.title}
                    </h3>

                    {/* Badge Row */}
                    <div className="flex gap-2 mt-3 flex-wrap items-center pb-2 text-xs font-medium">
                      {it.type.map((t, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E0FFF9] text-[#2F3E46] border border-teal-100 capitalize"
                        >
                          {t === "article" && <FileText size={14} className="text-indigo-500" />}
                          {t === "video" && <Video size={14} className="text-green-500" />}
                          {t}
                        </span>
                      ))}

                      {it.level && (
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                          {it.level}
                        </span>
                      )}

                      <span
                        className={`px-2 py-0.5 rounded-full border ${
                          it.status === "published"
                            ? "bg-green-50 text-green-600 border-green-200"
                            : "bg-yellow-50 text-yellow-600 border-yellow-200"
                        }`}
                      >
                        {it.status === "published" ? "Published" : "Draft"}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                      {it.summary || it.body?.substring(0, 120) || "No preview available..."}
                    </p>
                  </div>

                  {/* Actions Row */}
                  <div className="mt-5 flex justify-between items-center">
                    <div className="flex gap-2 items-center text-xs font-medium">
                      <span
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${
                          it.isPremium
                            ? "bg-purple-50 text-purple-600 border-purple-200"
                            : "bg-blue-50 text-blue-600 border-blue-200"
                        }`}
                      >
                        <Star size={12} />
                        {it.isPremium ? "Premium" : "Free"}
                      </span>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-200">
                        <Eye size={12} />
                        {it.views || 0}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        to={`/admin/content/${it._id}`}
                        className="text-[#1ABC9C] hover:text-[#0e8a73] flex items-center gap-1 text-sm font-medium transition-colors"
                      >
                        <Edit3 size={16} /> Edit
                      </Link>
                      <button
                        onClick={() => setDeleteId(it._id)}
                        className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm font-medium transition-colors"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-400">No content found.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <h2 className="text-lg font-bold text-[#2F3E46] mb-2">Confirm Delete</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this content? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                Delete Content
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}