import express from "express";
import { addComment, getCommentsByCourseId, replyToComment, deleteComment, likeComment, dislikeComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", addComment);
router.get("/course/:courseId", getCommentsByCourseId);
router.post("/reply", replyToComment);
router.delete("/:id", deleteComment);
router.patch("/:id/like", likeComment);
router.patch("/:id/dislike", dislikeComment);

export default router;
