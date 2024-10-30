import mongoose from "mongoose";

const ExerciseProgramSchema = new mongoose.Schema(
  {
    programName: { type: String, required: true },
    exercises: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        leftSets: { type: Number, default: 3 },
        leftReps: { type: Number, default: 10 },
        leftHoldTime: { type: Number, default: 30 },
        rightSets: { type: Number, default: null },
        rightReps: { type: Number, default: null },
        rightHoldTime: { type: Number, default: null },
        isDuplicated: { type: Boolean, default: false },
      },
    ],
    instructions: { type: String },
    selectedDays: [String],
    dailyFrequency: { type: Number, default: 1 },
    breakInterval: { type: Number, default: 60 },
  },
  { timestamps: true }
);

export default mongoose.model("ExerciseProgram", ExerciseProgramSchema);
