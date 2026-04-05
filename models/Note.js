import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  user: {
    type: String, // Adjust later for Auth
    default: "Student",
  },
  lessonTitle: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);
export default Note;
