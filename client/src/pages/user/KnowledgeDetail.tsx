import { useEffect, useState, type JSX } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown.css";
import Advertisements from "../../components/Advertisements";
import { useUser } from "../../context/useUser";
import api from "../../lib/api";

import {
  BookOpen,
  PlayCircle,
  ArrowLeft,
//   Star,
  CircleStar,
  Award,
  Eye,
  ThumbsUp,
  MessageSquare,
  Trash2,
  CornerDownRight,
  Edit,
  Check,
  X,
  Tags,
  Edit2,
} from "lucide-react";

// --- Interfaces ---

interface UserRef {
  _id: string;
  name: string;
}

interface Comment {
  _id: string;
  text: string;
  userId: UserRef;
  replies?: Comment[];
  parentComment?: string | null;
}

interface ContentDoc {
  _id: string;
  slug: string;
  title: string;
  body: string;
  summary?: string;
  type: string[]; // e.g., ['article', 'video']
  level: string;
  sourceUrl?: string;
  mediaUrl?: string;
  views?: number;
  isPremium?: boolean;
  topics?: string[];
}

const typeIcons: Record<string, JSX.Element> = {
  article: <BookOpen className="w-4 h-4 text-[#00FF7C]" />,
  video: <PlayCircle className="w-4 h-4 text-[#ff4a4aff]" />,
};

export default function KnowledgeDetail(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useUser();

  const [doc, setDoc] = useState<ContentDoc | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [aiSummary, setAiSummary] = useState<string>("");
  const [aiPoints, setAiPoints] = useState<string[]>([]);
  const [loadingSummary, setLoadingSummary] = useState<boolean>(false);
  const [showAISummary, setShowAISummary] = useState<boolean>(false);
  const [generatedOnce, setGeneratedOnce] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(15);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  useEffect(() => {
    async function fetchDoc() {
      if (!slug) return;
      try {
        const res = await api.get<ContentDoc>(`/content/${slug}`);
        setDoc(res.data);
        const likeRes = await api.get<{ count: number }>(`/likes/${res.data._id}`);
        setLikes(likeRes.data.count);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchDoc();
  }, [slug]);

  useEffect(() => {
    if (!doc?._id) return;
    fetchComments();
  }, [doc]);

  const fetchComments = async (): Promise<void> => {
    if (!doc?._id) return;
    const res = await api.get<Comment[]>(`/comments/${doc._id}`);
    setComments(res.data);
  };

  const handleLike = async (): Promise<void> => {
    if (!doc) return;
    const res = await api.post("/likes", { contentId: doc._id });
    setLiked(res.data.liked);
    const countRes = await api.get<{ count: number }>(`/likes/${doc._id}`);
    setLikes(countRes.data.count);
  };

  const handleAddComment = async (): Promise<void> => {
    if (!newComment.trim() || !doc) return;
    await api.post("/comments", {
      contentId: doc._id,
      text: newComment,
      parentComment: replyTo || null,
    });
    setNewComment("");
    setReplyTo(null);
    fetchComments();
  };

  const handleDeleteComment = async (id: string): Promise<void> => {
    await api.delete(`/comments/${id}`);
    fetchComments();
  };

  const handleEditComment = async (id: string): Promise<void> => {
    if (!editText.trim()) return;
    await api.put(`/comments/${id}`, { text: editText });
    setEditingId(null);
    setEditText("");
    fetchComments();
  };

  function getEmbedUrl(url: string | undefined): string | null {
    if (!url) return null;
    const ytFull = url.match(/youtube\.com\/watch\?v=([\w-]+)/);
    if (ytFull) return `https://www.youtube.com/embed/${ytFull[1]}`;
    const ytShort = url.match(/youtu\.be\/([\w-]+)/);
    if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;
    return url;
  }

  function renderComments(list: Comment[], isReply = false): JSX.Element[] {
    return list.slice(0, visibleCount).map((c) => (
      <div
        key={c._id}
        className={`border p-3 rounded-lg bg-[#f9f9f9] mt-2 ${isReply ? "ml-6" : ""}`}
      >
        <div className="flex justify-between items-center">
          {editingId === c._id ? (
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 px-2 py-1 border rounded"
              />
              <button onClick={() => handleEditComment(c._id)} className="text-green-600">
                <Check size={16} />
              </button>
              <button
                onClick={() => {
                  setEditingId(null);
                  setEditText("");
                }}
                className="text-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <p className="text-sm">
              <span className="font-semibold">{c.userId?.name || "User"}</span>: {c.text}
            </p>
          )}

          <div className="flex gap-2 text-xs">
            {!isReply && (
              <button
                onClick={() => setReplyTo(c._id)}
                className="text-blue-600 flex items-center gap-1"
              >
                <CornerDownRight size={12} /> Reply
              </button>
            )}

            {c.userId?._id === user?._id && (
              <>
                <button
                  onClick={() => {
                    setEditingId(c._id);
                    setEditText(c.text);
                  }}
                  className="text-yellow-600 flex items-center gap-1"
                >
                  <Edit size={12} />
                </button>
                <button
                  onClick={() => handleDeleteComment(c._id)}
                  className="text-red-600 flex items-center gap-1"
                >
                  <Trash2 size={12} />
                </button>
              </>
            )}
          </div>
        </div>

        {c.replies && c.replies.length > 0 && (
          <div className="mt-2">{renderComments(c.replies, true)}</div>
        )}
      </div>
    ));
  }

  const handleGenerateSummary = async (): Promise<void> => {
    if (!doc) return;
    setLoadingSummary(true);
    try {
      const res = await api.post("/summary", { content: doc.body });
      setAiSummary(res.data.summary);
      setAiPoints(res.data.keyPoints || []);
      setGeneratedOnce(true);
      setShowAISummary(true);
    } catch (err) {
      console.error("AI Error:", err);
      alert("Failed to generate summary");
    } finally {
      setLoadingSummary(false);
    }
  };

  if (!doc) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#09332C] text-[#F3F3F2]">
        <p className="text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative font-poppins text-[#2F3E46]">
      <div
        className="absolute inset-0 z-0"
        style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #e5fff0ff 100%)" }}
      />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 py-20 flex flex-col gap-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mt-10 text-sm text-[#2F3E46]/70 hover:text-[#09332C] transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <Advertisements position="right" ad={{ title: "Finance Ad", image: "../../../NoteNest-Ads.png", url: "https://notenest-front.vercel.app" }} />

        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          {(Array.isArray(doc.type) ? doc.type : [doc.type]).map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#09332C] border border-[#00FF7C]/40 shadow-sm"
            >
              {typeIcons[t] || null} {t}
            </span>
          ))}
          <span className="px-3 py-1 rounded-full bg-white text-[#09332C] border border-[#00FF7C]/40 shadow-sm">
            {doc.level}
          </span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-[#09332C]">
          {doc.title}
        </h1>

        <div className="flex flex-col gap-6 rounded-2xl p-8 border border-[#E7E7E3] shadow-lg bg-white">
          {doc.type.includes("article") && (
            <div className="markdown-body text-black">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ href, children }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      {children}
                    </a>
                  ),
                  img: ({ src, alt }) => (
                    <img src={src} alt={alt} className="max-w-full h-auto rounded-lg shadow-md" loading="lazy" />
                  ),
                }}
              >
                {doc.body || ""}
              </ReactMarkdown>
            </div>
          )}

          {doc.type.includes("video") && (
            <>
              {doc.sourceUrl ? (
                <iframe
                  className="w-full aspect-video rounded-xl shadow-md border border-[#E7E7E3]"
                  src={getEmbedUrl(doc.sourceUrl) || ""}
                  title={doc.title}
                  allowFullScreen
                />
              ) : doc.mediaUrl ? (
                <video className="w-full rounded-xl shadow-md border border-[#E7E7E3]" controls src={doc.mediaUrl} />
              ) : null}
            </>
          )}

          <div className="border border-[#E7E7E3] rounded-xl p-6 bg-[#FFF6E5] text-[#2F3E46]">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-[#09332C]">
              📖 Summary
            </h2>
            {!showAISummary ? (
              <p className="text-sm leading-relaxed">{doc.summary || "No summary provided yet."}</p>
            ) : (
              <>
                <p className="text-sm leading-relaxed">{aiSummary}</p>
                {aiPoints.length > 0 && (
                  <ul className="list-disc list-inside mt-3 text-sm">
                    {aiPoints.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                )}
              </>
            )}
            <div className="mt-4 flex justify-end gap-3">
              {!generatedOnce ? (
                <button
                  onClick={handleGenerateSummary}
                  disabled={loadingSummary}
                  className="px-4 py-2 text-sm font-medium rounded-xl bg-[#00FF7C] text-[#09332C] hover:bg-[#00e671] transition"
                >
                  {loadingSummary ? "Generating..." : "✨ Generate AI Summary"}
                </button>
              ) : (
                <button
                  onClick={() => setShowAISummary(!showAISummary)}
                  className="px-4 py-2 text-sm font-medium rounded-xl bg-[#E7E7E3] text-[#09332C] hover:bg-[#d1d1d1] transition"
                >
                  {showAISummary ? "👀 View Manual Summary" : "🤖 View AI Summary"}
                </button>
              )}
            </div>
          </div>

          <div className="flex gap-4 items-center text-sm font-semibold mt-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 px-3 py-1 rounded-full transition ${liked ? "bg-[#00FF7C] text-[#09332C] shadow-md" : "bg-[#E7E7E3] text-[#09332C] hover:bg-[#d1d1d1]"}`}
            >
              <ThumbsUp size={16} className={liked ? "fill-[#09332C] text-[#09332C]" : ""} />
              {likes}
            </button>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#E7E7E3] text-[#09332C]">
              <Eye size={16} /> {doc.views || 0}
            </span>
            {doc.isPremium !== undefined && (
              <span className={`flex items-center gap-1 px-3 py-1 rounded-full shadow-sm border ${doc.isPremium ? "bg-[#F4FF00]/40 text-[#09332C]" : "bg-[#00FF7C]/40 text-[#09332C]"}`}>
                {doc.isPremium ? <><Award size={12} /> Premium</> : <><CircleStar size={12} /> Free</>}
              </span>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-[#E7E7E3]">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MessageSquare size={18} /> Comments
          </h2>
          <div className="flex items-center gap-2 mb-4 bg-[#f0fff4] p-3 rounded-lg border border-[#00FF7C]/40">
            <Edit2 size={12} className="text-[#00FF7C]" />
            <p className="text-sm text-[#2F3E46]">Have a suggestion or feedback?</p>
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={replyTo ? "Replying..." : "Add a comment..."}
              className="flex-1 px-3 py-2 border rounded-lg text-sm"
            />
            <button onClick={handleAddComment} className="px-4 py-2 bg-[#00FF7C] text-[#09332C] rounded-lg font-medium hover:bg-[#00e671]">
              Post
            </button>
          </div>
          <div className="flex flex-col gap-3">{renderComments(comments)}</div>
          {visibleCount < comments.length && (
            <div className="text-center mt-4">
              <button onClick={() => setVisibleCount((p) => p + 15)} className="px-4 py-2 bg-gray-800 text-white rounded-full shadow hover:bg-gray-700 transition">
                Load More
              </button>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-[#E7E7E3]">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Tags size={18} /> Tags</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {doc.topics?.map((topic, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-white text-[#09332C] border border-[#00FF7C]/30 shadow-sm">
                #{topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}