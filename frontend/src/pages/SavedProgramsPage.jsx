import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrograms, updateSelectedDays } from "../redux/exerciseSlice";
import { FaDumbbell, FaClock, FaRedo, FaLayerGroup } from "react-icons/fa";
const SavedProgram = () => {
  const dispatch = useDispatch();
  const savedPrograms = useSelector((state) => state.exercises.savedPrograms);

  useEffect(() => {
    dispatch(fetchPrograms());
  }, [dispatch]);

  const handleDayToggle = (day) => {
    const updatedDays = savedPrograms[0].selectedDays.includes(day)
      ? savedPrograms[0].selectedDays.filter((d) => d !== day)
      : [...savedPrograms[0].selectedDays, day];

    dispatch(updateSelectedDays(updatedDays));
  };dd
  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete all programs?"))
      return;

    try {
      const response = await fetch("http://localhost:3001/api/exercises", {
        method: "DELETE",
      });

      if (response.ok) {
        alert("All programs deleted successfully.");
        dispatch(fetchPrograms());
      } else {
        throw new Error("Failed to delete all programs");
      }
    } catch (err) {
      console.error(err.message);
      alert("An error occurred while deleting programs.");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg max-w-screen-lg">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDeleteAll}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition duration-200"
        >
          Delete All Programs
        </button>
      </div>

      {savedPrograms.length > 0 ? (
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4 text-center border-b-2 border-blue-500 pb-4">
            {savedPrograms[0].programName}
          </h2>

          <p className="text-gray-700 text-center mb-6 italic">
            {savedPrograms[0].instructions}
          </p>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Exercises
            </h3>
            <ul className="list-inside space-y-3">
              {savedPrograms[0].exercises.map((exercise) => (
                <li
                  key={exercise._id}
                  className="text-gray-700 flex flex-col gap-2"
                >
                  <strong className="flex gap-2 items-center font-medium text-blue-500">
                    <FaDumbbell />{" "}
                    <span className=" text-gray-900 font-bold">
                      {" "}
                      {exercise.name}
                    </span>
                  </strong>

                  <div className="flex gap-4">
                    <span className="flex gap-2 items-center">
                      <FaClock color="#3B82F6" />{" "}
                      <span> {exercise.leftHoldTime} seconds</span>
                    </span>

                    <span className="flex gap-2 items-center">
                      <FaRedo color="#3B82F6" />{" "}
                      <span> {exercise.leftSets} sets</span>
                    </span>
                    <span className="flex gap-2 items-center">
                      <FaLayerGroup color="#3B82F6" />{" "}
                      <span>{exercise.leftReps} reps</span>
                    </span>
                    {exercise.isDuplicated && (
                      <span className="text-sm text-gray-500 italic">
                        {" "}
                        (both Sides)
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Frequency and Break
            </h3>
            <p className="text-gray-700 mb-2">
              <span className=" text-gray-900 font-bold mr-3">
                {" "}
                Daily Frequency
              </span>
              {savedPrograms[0].dailyFrequency} times / day
            </p>
            <p className="text-gray-700">
              <span className=" text-gray-900 font-bold mr-3">
                {" "}
                Break Interval
              </span>{" "}
              {savedPrograms[0].breakInterval} secs
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Select Days
            </h3>
            <div className="flex flex-wrap gap-3">
              {["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"].map((day) => (
                <label
                  key={day}
                  className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg shadow-sm cursor-pointer transition-colors duration-200 ease-in-out hover:bg-blue-50"
                >
                  <input
                    type="checkbox"
                    checked={savedPrograms[0].selectedDays.includes(day)}
                    onChange={() => handleDayToggle(day)}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-800 font-medium">{day}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 italic">
          No saved programs found.
        </p>
      )}
    </div>
  );
};

export default SavedProgram;
