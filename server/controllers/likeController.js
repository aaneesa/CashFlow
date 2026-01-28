import Like from "../models/Like.js";

export const toggleLike = async (req, res) => {
  try {
    const { contentId } = req.body;

    const existing = await Like.findOne({ contentId, userId: req.userId });

    if (existing) {
      await existing.deleteOne();
      return res.json({ liked: false });
    } else {
      await Like.create({ contentId, userId: req.userId });
      return res.json({ liked: true });
    }
  } catch (err) {
    res.status(500).json({ msg: "Error toggling like" });
  }
};

export const getLikesCount = async (req, res) => {
  try {
    const { contentId } = req.params;
    const count = await Like.countDocuments({ contentId });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching likes" });
  }
};