import ExerciseProgram from "../models/ExerciseProgram.js";

// Create a new exercise program
export const createProgram = async (req, res) => {
  const { programName, exercises, instructions, selectedDays } = req.body;

  const newProgram = new ExerciseProgram({
    programName,
    exercises,
    instructions,
    selectedDays,
  });

  try {
    const savedProgram = await newProgram.save();
    res.status(201).json(savedProgram);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all exercise programs
export const getAllPrograms = async (req, res) => {
  try {
    const programs = await ExerciseProgram.find();
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific program by ID
export const getProgramById = async (req, res) => {
  try {
    const program = await ExerciseProgram.findById(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });
    res.json(program);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a program by ID
export const updateProgramById = async (req, res) => {
  try {
    const updatedProgram = await ExerciseProgram.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProgram)
      return res.status(404).json({ message: "Program not found" });
    res.json(updatedProgram);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a specific program by ID
export const deleteProgramById = async (req, res) => {
  try {
    const deletedProgram = await ExerciseProgram.findByIdAndDelete(
      req.params.id
    );
    if (!deletedProgram)
      return res.status(404).json({ message: "Program not found" });
    res.json(deletedProgram);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete all programs
export const deleteAllPrograms = async (req, res) => {
  try {
    const deletedPrograms = await ExerciseProgram.deleteMany();
    res.json({ message: "All programs deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
