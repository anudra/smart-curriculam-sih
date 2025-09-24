const classSchema = new mongoose.Schema({
  subject_name: { type: String, required: true },
  subject_code: { type: String, required: true },
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  semester: Number,
  section: String,
  classroom_no: String,
  schedules: [
    {
      day_of_week: { type: Number, min: 1, max: 7 },
      start_time: String,
      end_time: String22,
    },
  ],
  enrolled_students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Class", classSchema);
