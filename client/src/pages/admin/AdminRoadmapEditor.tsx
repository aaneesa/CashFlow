import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../lib/api";

// 1. Define strict types for the Roadmap structure
interface RoadmapStep {
  title: string;
  articleLink: string;
}

interface RoadmapLevels {
  beginner: RoadmapStep[];
  intermediate: RoadmapStep[];
  advanced: RoadmapStep[];
}

interface RoadmapForm {
  title: string;
  description: string;
  category: string;
  levels: RoadmapLevels;
}

// Helper type for level keys
type LevelKey = keyof RoadmapLevels;

export default function AdminRoadmapEditor(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<RoadmapForm>({
    title: "",
    description: "",
    category: "Finance",
    levels: {
      beginner: [],
      intermediate: [],
      advanced: [],
    },
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  useEffect(() => {
    if (id) {
      const fetchRoadmap = async () => {
        try {
          // Assuming the API returns the exact shape of RoadmapForm
          const { data } = await api.get<RoadmapForm>(`/roadmaps/${id}`);
          setForm(data);
        } catch (err) {
          console.error("Failed to load roadmap:", err);
        }
      };
      fetchRoadmap();
    }
  }, [id]);

  const addStep = (level: LevelKey): void => {
    setForm((prev) => ({
      ...prev,
      levels: {
        ...prev.levels,
        [level]: [...prev.levels[level], { title: "", articleLink: "" }],
      },
    }));
  };

  const updateStep = (
    level: LevelKey,
    idx: number,
    field: keyof RoadmapStep,
    value: string
  ): void => {
    const updated = [...form.levels[level]];
    updated[idx] = { ...updated[idx], [field]: value };
    
    setForm((prev) => ({
      ...prev,
      levels: { ...prev.levels, [level]: updated },
    }));
  };

  const removeStep = (level: LevelKey, idx: number): void => {
    setForm((prev) => ({
      ...prev,
      levels: {
        ...prev.levels,
        [level]: prev.levels[level].filter((_, i) => i !== idx),
      },
    }));
  };

  const save = async (): Promise<void> => {
    try {
      if (id) {
        await api.put(`/roadmaps/${id}`, form);
      } else {
        await api.post(`/roadmaps`, form);
      }
      
      setModalMessage("✅ Roadmap saved successfully!");
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/admin");
      }, 2000);
    } catch (err) {
      console.error(err);
      setModalMessage("❌ Failed to save roadmap");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
    }
  };

  const levelKeys: LevelKey[] = ["beginner", "intermediate", "advanced"];

  return (
    <div className="min-h-screen w-full relative bg-linear-to-b from-[#E0FFF9] to-[#FFFFFF] text-gray-800 py-20 px-4 md:px-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-5 left-5 z-20 bg-white/70 backdrop-blur-md border border-teal-100 px-4 py-2 rounded-lg shadow-sm hover:bg-white hover:shadow-md transition"
      >
        ← Back
      </button>

      <div className="relative z-10 max-w-6xl mx-auto bg-white/70 backdrop-blur-md border border-teal-100 p-6 md:p-10 rounded-3xl shadow-lg space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#2F3E46] text-center">
          {id ? "Edit Roadmap" : "New Roadmap"}
        </h1>

        {/* Title */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Title</label>
          <input
            className="bg-white border border-teal-100 rounded-xl px-4 py-3 w-full shadow-sm focus:ring-2 focus:ring-[#1ABC9C] outline-none transition"
            placeholder="Roadmap Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Description</label>
          <textarea
            className="bg-white border border-teal-100 rounded-xl px-4 py-3 w-full min-h-20 shadow-sm focus:ring-2 focus:ring-[#1ABC9C] outline-none transition"
            placeholder="Roadmap Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Category</label>
          <select
            className="bg-white border border-teal-100 rounded-xl px-4 py-3 w-full md:w-auto text-gray-800 shadow-sm focus:ring-2 focus:ring-[#1ABC9C] outline-none transition"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {["Finance", "Investing", "Stock Market", "Money Management"].map(
              (opt) => (
                <option key={opt} value={opt}>{opt}</option>
              )
            )}
          </select>
        </div>

        {/* Levels Section */}
        {levelKeys.map((level) => (
          <div
            key={level}
            className="bg-white/60 border border-teal-100 p-5 rounded-xl shadow-sm space-y-4"
          >
            <h2 className="text-xl font-bold capitalize text-[#2F3E46]">
              {level} Level
            </h2>

            {form.levels[level].map((step, idx) => (
              <div key={`${level}-${idx}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-5">
                  <input
                    className="bg-white border border-teal-100 rounded-xl px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-[#1ABC9C] outline-none"
                    placeholder="Step Title"
                    value={step.title}
                    onChange={(e) =>
                      updateStep(level, idx, "title", e.target.value)
                    }
                  />
                </div>
                <div className="md:col-span-6">
                  <input
                    className="bg-white border border-teal-100 rounded-xl px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-[#1ABC9C] outline-none"
                    placeholder="Article Link"
                    value={step.articleLink}
                    onChange={(e) =>
                      updateStep(level, idx, "articleLink", e.target.value)
                    }
                  />
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <button
                    onClick={() => removeStep(level, idx)}
                    className="bg-red-50 text-red-500 border border-red-100 px-3 py-2 rounded-lg hover:bg-red-500 hover:text-white transition shadow-sm w-full md:w-auto"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => addStep(level)}
              className="bg-white text-[#1ABC9C] border-2 border-[#1ABC9C] border-dashed font-semibold px-4 py-2 rounded-lg hover:bg-[#1ABC9C] hover:text-white transition w-full md:w-auto"
            >
              + Add Step to {level}
            </button>
          </div>
        ))}

        {/* Final Save Action */}
        <button
          onClick={save}
          className="w-full bg-linear-to-r from-[#1ABC9C] to-[#00FFE0] text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:shadow-[#1ABC9C]/30 transition transform hover:-translate-y-1 active:scale-95"
        >
          Save Complete Roadmap
        </button>

        {/* Modal Notification */}
        {showModal && (
          <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm w-full animate-in zoom-in duration-300">
              <p className="text-xl font-bold text-[#2F3E46]">{modalMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}