import React, { useEffect, useState } from "react";
import type {ChangeEvent} from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "../../lib/api";
import "github-markdown-css/github-markdown-light.css";
import toast from "react-hot-toast";

// 1. Define strict interfaces for Content
type ContentType = "article" | "video";
type ContentLevel = "beginner" | "intermediate" | "advanced";
type ContentStatus = "draft" | "published";

interface ContentForm {
  title: string;
  summary: string;
  type: ContentType[];
  level: ContentLevel;
  topics: string; // Used as string for the input field
  body: string;
  status: ContentStatus;
  sourceUrl: string;
  isPremium: boolean;
  views: number;
}

interface SavePayload extends Omit<ContentForm, "topics"> {
  topics: string[]; // Converted to array for the API
}

export default function AdminEditor(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [form, setForm] = useState<ContentForm>({
    title: "",
    summary: "",
    type: [],
    level: "beginner",
    topics: "",
    body: "",
    status: "draft",
    sourceUrl: "",
    isPremium: false,
    views: 0,
  });
  
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const fetchContent = async () => {
        try {
          const { data } = await api.get(`/admin/contents/content/${id}`);
          
          setForm((prev) => ({
            ...prev,
            ...data,
            topics: Array.isArray(data.topics)
              ? data.topics.join(", ")
              : data.topics || "",
            // Ensure type is always an array
            type: Array.isArray(data.type) ? data.type : data.type ? [data.type] : [],
            sourceUrl: data.sourceUrl || "",
          }));
        } catch (err) {
          console.error("Failed to load content:", err);
          toast.error("Error loading content data.");
        }
      };
      fetchContent();
    }
  }, [id]);

  const save = async (): Promise<void> => {
    // 2. Validation Logic
    if (form.type.includes("video")) {
      if (!form.sourceUrl?.trim()) {
        toast.error("Please provide a video URL before saving.");
        return;
      }

      try {
        new URL(form.sourceUrl);
      } catch {
        toast.error("Invalid video URL. Please enter a valid link.");
        return;
      }
    }

    // 3. Transform data for API (Payload)
    const payload: SavePayload = {
      ...form,
      topics: form.topics
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      setIsSaving(true);
      if (id) {
        await api.put(`/admin/contents/content/${id}`, payload);
      } else {
        await api.post(`/admin/contents/create`, payload);
      }

      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/admin");
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save content.");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleType = (val: ContentType): void => {
    setForm((prev) => {
      const exists = prev.type.includes(val);
      return {
        ...prev,
        type: exists
          ? prev.type.filter((t) => t !== val)
          : [...prev.type, val],
      };
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
    setForm((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  return (
    <div className="min-h-screen w-full relative bg-linear-to-br from-gray-50 via-white to-gray-100 text-gray-900 py-20 px-4 md:px-8">
      {/* Background grid */}
      <div className="absolute inset-0 z-0 grid grid-cols-12 gap-px opacity-10 pointer-events-none">
        {Array.from({ length: 120 }).map((_, i) => (
          <div key={i} className="border border-gray-300"></div>
        ))}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="fixed top-5 left-5 z-20 px-5 py-2 rounded-full backdrop-blur-md bg-white/30 border border-white/50 text-gray-900 font-medium shadow-lg hover:scale-105 hover:bg-white/50 transition-all"
      >
        ← Back
      </button>

      <div className="relative z-10 max-w-6xl mx-auto bg-white/60 backdrop-blur-xl border border-gray-200/50 p-6 md:p-10 rounded-3xl shadow-2xl space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-gray-900 uppercase">
            {id ? "Edit Content" : "New Content"}
          </h1>
          <p className="text-gray-500 font-medium">Draft and publish your latest articles or videos</p>
        </header>

        {/* Title */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-gray-400 ml-1">Title</label>
          <input
            name="title"
            className="bg-white/70 border border-gray-300 rounded-xl px-5 py-3 w-full placeholder-gray-400 focus:ring-2 focus:ring-black outline-none transition-all"
            placeholder="Enter content title..."
            value={form.title}
            onChange={handleInputChange}
          />
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-gray-400 ml-1">Short Summary</label>
          <textarea
            name="summary"
            className="bg-white/70 border border-gray-300 rounded-xl px-5 py-3 w-full min-h-20 focus:ring-2 focus:ring-black outline-none transition-all"
            placeholder="Briefly describe this content..."
            value={form.summary}
            onChange={handleInputChange}
          />
        </div>

        {/* Content Type Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase text-gray-400 ml-1">Content Type</label>
          <div className="flex gap-4 flex-wrap">
            {(["article", "video"] as ContentType[]).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => toggleType(opt)}
                className={`px-8 py-3 rounded-xl border text-sm font-bold uppercase tracking-widest transition-all ${
                  form.type.includes(opt)
                    ? "bg-black text-white border-black shadow-xl scale-105"
                    : "bg-white/60 text-gray-500 border-gray-200 hover:border-gray-400"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400 ml-1">Difficulty Level</label>
            <select
              name="level"
              className="bg-white/70 border border-gray-300 rounded-xl px-5 py-3 w-full focus:ring-2 focus:ring-black outline-none"
              value={form.level}
              onChange={handleInputChange}
            >
              {["beginner", "intermediate", "advanced"].map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400 ml-1">Publish Status</label>
            <select
              name="status"
              className="bg-white/70 border border-gray-300 rounded-xl px-5 py-3 w-full focus:ring-2 focus:ring-black outline-none"
              value={form.status}
              onChange={handleInputChange}
            >
              {["draft", "published"].map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end pb-3">
            <label className="flex items-center gap-3 text-gray-700 font-bold cursor-pointer hover:text-black transition-colors">
              <input
                type="checkbox"
                name="isPremium"
                checked={form.isPremium}
                onChange={(e) => setForm({ ...form, isPremium: e.target.checked })}
                className="w-5 h-5 accent-black rounded"
              />
              Premium Content 💎
            </label>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-gray-400 ml-1">Topics</label>
          <input
            name="topics"
            className="bg-white/70 border border-gray-300 rounded-xl px-5 py-3 w-full placeholder-gray-400 focus:ring-2 focus:ring-black outline-none"
            placeholder="Finance, Investing, Stocks (comma separated)"
            value={form.topics}
            onChange={handleInputChange}
          />
        </div>

        {/* Body Editor (Markdown) */}
        {form.type.includes("article") && (
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase text-gray-400 ml-1">Article Content (Markdown)</label>
            <div className="grid md:grid-cols-2 gap-6 h-125">
              <textarea
                name="body"
                className="bg-white/70 border border-gray-300 rounded-xl px-5 py-4 w-full h-full placeholder-gray-400 font-mono text-sm focus:ring-2 focus:ring-black outline-none resize-none"
                placeholder="# Start writing..."
                value={form.body}
                onChange={handleInputChange}
              />
              <div className="bg-white/90 border border-gray-200 rounded-xl p-6 overflow-y-auto shadow-inner">
                <div className="markdown-body">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {form.body || "*Preview will appear here...*"}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Source */}
        {form.type.includes("video") && (
          <div className="space-y-2 animate-in fade-in slide-in-from-left-2">
            <label className="text-xs font-bold uppercase text-gray-400 ml-1">Video Source URL</label>
            <input
              name="sourceUrl"
              className="bg-white/70 border border-gray-300 rounded-xl px-5 py-3 w-full placeholder-gray-400 focus:ring-2 focus:ring-black outline-none"
              placeholder="https://www.youtube.com/embed/..."
              value={form.sourceUrl}
              onChange={handleInputChange}
            />
          </div>
        )}

        {/* Views Count Display */}
        {id && (
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg w-fit">
            <span className="text-sm font-bold text-gray-500 uppercase">Total Views:</span>
            <span className="font-mono font-bold text-black">{form.views.toLocaleString()}</span>
          </div>
        )}

        {/* Submit Action */}
        <button
          onClick={save}
          disabled={isSaving}
          className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-black text-xl py-5 rounded-2xl shadow-2xl tracking-widest uppercase transition-all transform hover:scale-[1.01] active:scale-95"
        >
          {isSaving ? "Saving Changes..." : "Save Content"}
        </button>

        {/* Success Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-10 shadow-2xl text-center max-w-sm w-full mx-4 transform animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                ✓
              </div>
              <h2 className="text-2xl font-black mb-2 text-gray-900">Success!</h2>
              <p className="text-gray-500 font-medium">Content has been safely stored.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}