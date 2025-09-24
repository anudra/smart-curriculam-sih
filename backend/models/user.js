const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema({
  roll_no: { type: String, unique: true, sparse: true },
  course: String,
  branch: String,
  year: Number,
  interests: [String],
  career_goals: [String],
  gpa: Number,
});

const teacherProfileSchema = new mongoose.Schema({
  department: String,
  employee_id: String,
  designation: String,
  experience_years: Number,
  specialization: [String],
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, maxlength: 150 },
    image_url: { type: String },
    role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },

    student_profile: {
      type: studentProfileSchema,
      required: function () {
        return this.role === "student";
      },
      default: undefined,
    },

    teacher_profile: {
      type: teacherProfileSchema,
      required: function () {
        return this.role === "teacher";
      },
      default: undefined,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("User", userSchema);
