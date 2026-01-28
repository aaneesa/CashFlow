import Like from "../models/Like.js";
import Comment from "../models/Comment.js";

export const getUserActivity = async (req, res) => {
  try {
    const userId = req.userId;

    const likes = await Like.find({ userId }).populate("contentId");
    const likedContents = likes.map(l => l.contentId);

    const comments = await Comment.find({ userId }).populate("contentId");
    const commentedContents = comments.map(c => c.contentId);

    const uniqueCommented = [];
    const seen = new Set();
    for (let c of commentedContents) {
      if (c && !seen.has(c._id.toString())) {
        seen.add(c._id.toString());
        uniqueCommented.push(c);
      }
    }

    res.json({
      liked: likedContents,
      commented: uniqueCommented
    });
  } catch (err) {
    console.error("Error fetching activity:", err);
    res.status(500).json({ msg: "Error fetching activity" });
  }
};