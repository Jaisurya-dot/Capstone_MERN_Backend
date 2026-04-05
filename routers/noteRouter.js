import express from "express";
import { addNote, getNotesByCourseId, updateNote, deleteNote } from "../controllers/noteController.js";

const router = express.Router();

router.post("/", addNote);
router.get("/course/:courseId", getNotesByCourseId);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
