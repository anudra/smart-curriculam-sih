const attendanceSchema = new mongoose.Schema({
  schedule_id: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  session_code: String,
  session_date: Date,
  expires_at: Date,
  is_active: { type: Boolean, default: true },

  records: [
    {
      student_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: { type: String, enum: ["present", "absent"], default: "absent" },
      marked_at: Date,
      marked_by: { type: String, enum: ["student_qr", "teacher_manual"] }
    }
  ]
});

module.exports = mongoose.model("Attendance", attendanceSchema);
