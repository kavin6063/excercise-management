import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrograms, updateSelectedDays } from "../redux/exerciseSlice";

const SavedProgram = () => {
  const dispatch = useDispatch();
  const savedPrograms = useSelector((state) => state.exercises.savedPrograms);

  useEffect(() => {
    // Fetch saved programs when the component mounts
    dispatch(fetchPrograms());
  }, [dispatch]);

  const handleDayToggle = (day) => {
    const updatedDays = savedPrograms[0].selectedDays.includes(day)
      ? savedPrograms[0].selectedDays.filter((d) => d !== day)
      : [...savedPrograms[0].selectedDays, day];

    // Dispatch action to update selected days
    dispatch(updateSelectedDays(updatedDays));

    // Optionally send updated days to backend
    // fetch(`http://localhost:3001/api/exercises/${savedPrograms[0]._id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ selectedDays: updatedDays }),
    // });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {savedPrograms.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">
            {savedPrograms[0].programName}
          </h2>
          <p className="mb-4">{savedPrograms[0].instructions}</p>

          <h3 className="text-xl font-semibold mb-2">Exercises:</h3>
          <ul className="list-disc pl-5 mb-4">
            {savedPrograms[0].exercises.map((exercise) => (
              <li key={exercise._id} className="mb-2">
                <strong>{exercise.name}</strong>:
                {` ${exercise.leftSets} sets, ${exercise.leftReps} reps, ${exercise.leftHoldTime}s hold time`}
                {exercise.isDuplicated && ` (Duplicated)`}
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mb-2">Select Days:</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"].map((day) => (
              <label key={day} className="flex items-center">
                <input
                  type="checkbox"
                  checked={savedPrograms[0].selectedDays.includes(day)}
                  onChange={() => handleDayToggle(day)}
                  className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </>
      )}
      {savedPrograms.length === 0 && <p>No saved programs found.</p>}
    </div>
  );
};

export default SavedProgram;
