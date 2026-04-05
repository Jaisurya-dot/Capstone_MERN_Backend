import Comment from "../models/Comment.js";

// Add a new comment to a course video
export const addComment = async (req, res) => {
  try {
    const { courseId, content, user } = req.body;
    const newComment = new Comment({
      course: courseId,
      content,
      user: user || "Student",
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all comments for a course
export const getCommentsByCourseId = async (req, res) => {
  try {
    const comments = await Comment.find({ course: req.params.courseId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reply to a comment
export const replyToComment = async (req, res) => {
  try {
    const { commentId, content, user } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.replies.push({ content, user: user || "Student" });
    const updatedComment = await comment.save();
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Vote on a comment (Like)
export const likeComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { returnDocument: 'after' }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Vote on a comment (Dislike)
export const dislikeComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { dislikes: 1 } },
      { returnDocument: 'after' }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
