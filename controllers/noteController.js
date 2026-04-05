import Note from "../models/Note.js";

// Add a new note for a specific lesson/timestamp
export const addNote = async (req, res) => {
  try {
    const { courseId, lessonTitle, timestamp, content, user } = req.body;
    const newNote = new Note({
      course: courseId,
      lessonTitle,
      timestamp,
      content,
      user: user || "Student",
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all notes for a specific course
export const getNotesByCourseId = async (req, res) => {
  try {
    const notes = await Note.find({ course: req.params.courseId }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if (!updatedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
