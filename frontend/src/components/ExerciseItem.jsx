import React, { useState } from "react";

const ExerciseItem = ({ exercise, onDuplicate, onDelete, updateExercise }) => {
  const [exerciseData, setExerciseData] = useState(exercise);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...exerciseData, [name]: value };
    setExerciseData(updatedData);
    updateExercise(exercise.id, updatedData);
  };

  return (
    <div className="exercise-item">
      <input
        type="number"
        name="sets"
        value={exerciseData.sets}
        onChange={handleChange}
        placeholder="Sets"
      />
      <input
        type="number"
        name="reps"
        value={exerciseData.reps}
        onChange={handleChange}
        placeholder="Reps"
      />
      <input
        type="number"
        name="holdTime"
        value={exerciseData.holdTime}
        onChange={handleChange}
        placeholder="Hold Time"
      />
      <button onClick={() => onDuplicate(exercise.id)}>Duplicate</button>
      <button onClick={() => onDelete(exercise.id)}>Delete</button>
    </div>
  );
};

export default ExerciseItem;
