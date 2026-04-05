import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  fileList: [
    {
      fileName: { 
        type: String, 
        required: true 
      },
      fileUrl: { 
        type: String, 
        required: true 
      },
      fileType: { 
        type: String, 
        enum: ["video", "pdf", "image", "document", "other"], 
        default: "other" 
      },
    },
  ],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Module = mongoose.model("Module", moduleSchema);

export default Module;
