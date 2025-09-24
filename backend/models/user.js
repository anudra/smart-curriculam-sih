const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, maxlength: 150 },
  image_url: { type: String },
  role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },
  is_profile_complete: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },

  student_info: {
    roll_no: { type: String, unique: true, sparse: true },
    course: String,
    branch: String,
    year: Number,
    interests: [String],
    career_goals: [String],
    gpa: Number,
  },

  teacher_info: {
    department: String,
    employee_id: String,
    designation: String,
    experience_years: Number,
    specialization: [String]
  }
});

module.exports = mongoose.model("User", userSchema);
