import Module from "../models/Module.js";
import Course from "../models/Course.js";

// Add a new module to a course
export const createModule = async (req, res) => {
  try {
    const { title, description, fileList, courseId, order } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Create module
    const newModule = new Module({
      title,
      description,
      fileList,
      course: courseId,
      order
    });

    const savedModule = await newModule.save();

    // Add module reference to course
    course.modules.push(savedModule._id);
    await course.save();

    res.status(201).json(savedModule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get modules for a specific course
export const getModulesByCourseId = async (req, res) => {
  try {
    const modules = await Module.find({ course: req.params.courseId }).sort({ order: 1 });
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get module by ID
export const getModuleById = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) return res.status(404).json({ message: "Module not found" });
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update module details (including fileList)
export const updateModule = async (req, res) => {
  try {
    const updatedModule = await Module.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if (!updatedModule) return res.status(404).json({ message: "Module not found" });
    res.status(200).json(updatedModule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a module from a course
export const deleteModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) return res.status(404).json({ message: "Module not found" });

    // Remove module reference from course
    await Course.findByIdAndUpdate(module.course, {
      $pull: { modules: module._id }
    });

    // Delete module
    await Module.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Module deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
