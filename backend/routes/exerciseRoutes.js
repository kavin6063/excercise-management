import express from "express";
import {
  createProgram,
  getAllPrograms,
  getProgramById,
  updateProgramById,
  deleteProgramById,
  deleteAllPrograms,
} from "../controllers/exerciseController.js";

const router = express.Router();

// Create a new program
router.post("/", createProgram);

// Get all programs
router.get("/", getAllPrograms);

// Get a program by ID
router.get("/:id", getProgramById);

// Update a program by ID
router.put("/:id", updateProgramById);

// Delete a specific program by ID
router.delete("/:id", deleteProgramById);

// Delete all programs
router.delete("/", deleteAllPrograms);

export default router;
