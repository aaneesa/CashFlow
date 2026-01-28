import Comment from "../models/Comment.js";


export const addComment = async (req, res) => {
  try {
    const { contentId, text, parentComment } = req.body;

    const comment = await Comment.create({
      contentId,
      userId: req.userId,
      text,
      parentComment: parentComment || null,
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ msg: "Error adding comment" });
  }
};

export const getComments = async (req, res) => {
  try {
    const { contentId } = req.params;

    const comments = await Comment.find({ contentId, parentComment: null })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await Comment.find({ parentComment: comment._id })
          .populate("userId", "name email")
          .sort({ createdAt: 1 });
        return { ...comment.toObject(), replies };
      })
    );

    res.json(commentsWithReplies);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ msg: "Error fetching comments" });
  }
};


// ⇝ Edit comment (only owner can edit)
export const editComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ msg: "Comment not found" });

    if (comment.userId.toString() !== req.userId) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    comment.text = text;
    await comment.save();

    res.json({ msg: "Comment updated", comment });
  } catch (err) {
    console.error("Error editing comment:", err);
    res.status(500).json({ msg: "Error editing comment" });
  }
};


// ⇝ Delete comment (only owner can delete)
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ msg: "Comment not found" });
    if (comment.userId.toString() !== req.userId) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    await comment.deleteOne();
    res.json({ msg: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting comment" });
  }
};