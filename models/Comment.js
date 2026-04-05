import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  user: {
    type: String, // Replacing with actual User ID later if Auth is added
    default: "Student",
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  replies: [
    {
      user: String,
      content: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
