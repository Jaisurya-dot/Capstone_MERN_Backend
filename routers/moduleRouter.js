import express from "express";
import { 
  createModule, 
  getModulesByCourseId, 
  getModuleById, 
  updateModule, 
  deleteModule 
} from "../controllers/moduleController.js";

const router = express.Router();

router.post("/", createModule);
router.get("/course/:courseId", getModulesByCourseId);
router.get("/:id", getModuleById);
router.put("/:id", updateModule);
router.delete("/:id", deleteModule);

export default router;
