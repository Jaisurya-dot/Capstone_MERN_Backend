import Course from "../models/Course.js";
import Module from "../models/Module.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { title, description, instructor, category, thumbnail, price } = req.body;
    
    const newCourse = new Course({
      title,
      description,
      instructor,
      category,
      thumbnail,
      price
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("modules");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("modules");
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update course
export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if (!updatedCourse) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete course (and its modules)
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Delete associated modules
    await Module.deleteMany({ course: course._id });

    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Course and its modules deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
