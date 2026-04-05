import express from "express";
import { addComment, getCommentsByCourseId, replyToComment, deleteComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", addComment);
router.get("/course/:courseId", getCommentsByCourseId);
router.post("/reply", replyToComment);
router.delete("/:id", deleteComment);

export default router;
