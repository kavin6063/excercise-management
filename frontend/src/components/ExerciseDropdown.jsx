import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExercise } from "../redux/exerciseSlice";

const categories = {
  "Lower Body": ["Squats", "Lunges", "Leg Press"],
  "Upper Body": ["Push-Ups", "Pull-Ups", "Bench Press"],
  Core: ["Crunches", "Planks", "Russian Twists"],
};

const ExerciseDropdown = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleExerciseSelect = (exercise) => {
    const newExercise = {
      id: `${exercise}-${Date.now()}`,
      name: exercise,
      sets: 3,
      reps: 10,
      holdTime: 30,
      side: "Both",
    };
    dispatch(addExercise(newExercise));
    setOpen(false);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg focus:outline-none"
      >
        Add Exercises
      </button>

      {open && (
        <div className="absolute mt-2 bg-white border rounded-lg shadow-lg z-10">
          {Object.keys(categories).map((category) => (
            <div
              key={category}
              onMouseEnter={() => setHoveredCategory(category)}
              className="relative px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {category}
              {hoveredCategory === category && (
                <div className="absolute left-full top-0 mt-0 ml-2 bg-white border rounded-lg shadow-lg">
                  {categories[category].map((exercise) => (
                    <div
                      key={exercise}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleExerciseSelect(exercise)}
                    >
                      {exercise}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseDropdown;
