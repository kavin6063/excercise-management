import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveProgram,
  clearExercises,
  setCustomInstructions,
} from "../redux/exerciseSlice";

const ExerciseForm = () => {
  const [programName, setProgramName] = useState("");
  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.exercises.exercises);
  const customInstructions = useSelector(
    (state) => state.exercises.customInstructions
  );
  const selectedDays = useSelector((state) => state.exercises.selectedDays);

  const handleSaveProgram = async () => {
    if (programName.trim() && exercises.length > 0 && customInstructions) {
      // Prepare the data to be sent
      const programData = {
        programName,
        exercises,
        instructions: customInstructions,
        selectedDays,
      };

      try {
        // Send POST request to the backend
        const response = await fetch("http://localhost:3001/api/exercises", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(programData),
        });

        if (!response.ok) {
          throw new Error("Failed to save program");
        }

        const savedProgram = await response.json();

        // Optionally dispatch Redux action if needed
        dispatch(saveProgram(savedProgram));

        // Clear input fields and reset state
        setProgramName("");
        dispatch(setCustomInstructions(""));

        alert("Program saved successfully!");
      } catch (error) {
        console.error("Error saving program:", error);
        alert("Failed to save program. Please try again.");
      }
    } else {
      alert(
        "Please enter a program name or add exercises or custom message before saving."
      );
    }
  };

  const handleClearAll = () => {
    dispatch(clearExercises());
    alert("All exercises cleared!");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
        <input
          type="text"
          placeholder="Program Name"
          value={programName}
          onChange={(e) => setProgramName(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md shadow-md transition duration-200 ease-in-out"
          onClick={handleSaveProgram}
        >
          Save Program
        </button>
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md shadow-md transition duration-200 ease-in-out"
        onClick={handleClearAll}
      >
        Clear All
      </button>
    </div>
  );
};

export default ExerciseForm;
