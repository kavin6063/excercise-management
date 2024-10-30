import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementParam,
  decrementParam,
  duplicateSide,
  updateExerciseParam,
  reorderExercises,
} from "../redux/exerciseSlice";
import {
  FaPlus,
  FaMinus,
  FaDumbbell,
  FaRedoAlt,
  FaListOl,
  FaClock,
} from "react-icons/fa";
import { MdOutlineDragIndicator } from "react-icons/md";
import Sortable from "sortablejs";
import Switch from "./shared/Switch";

const ExerciseList = () => {
  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.exercises.exercises);
  const [currentSide, setCurrentSide] = useState("Left");
  const listRef = useRef(null);

  useEffect(() => {
    // Initialize sortable on the exercise list container
    if (listRef.current && !listRef.current.sortable) {
      Sortable.create(listRef.current, {
        animation: 150,
        onEnd: (event) => {
          const { oldIndex, newIndex } = event;
          // Dispatch reorder action to Redux
          dispatch(
            reorderExercises({
              sourceIndex: oldIndex,
              destinationIndex: newIndex,
            })
          );
        },
      });
      listRef.current.sortable = true;
    }
  }, [dispatch, listRef, exercises]);

  const handleIncrement = (id, name) => {
    dispatch(incrementParam({ id, side: currentSide.toLowerCase(), name }));
  };

  const handleDecrement = (id, name) => {
    dispatch(decrementParam({ id, side: currentSide.toLowerCase(), name }));
  };

  const handleToggleSide = (id) => {
    const newSide = currentSide === "Left" ? "Right" : "Left";
    setCurrentSide(newSide);
    dispatch(
      updateExerciseParam({ id, name: "side", side: newSide, value: newSide })
    );
  };

  const handleDuplicate = (id) => {
    dispatch(duplicateSide({ id }));
  };

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div ref={listRef}>
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="flex flex-col gap-4 mb-6 p-4 rounded-lg shadow-md bg-white"
          >
            <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <MdOutlineDragIndicator className="text-gray-500 cursor-pointer" />
              <FaDumbbell className="text-blue-600" />
              <h2>{exercise.name}</h2>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap bg-slate-100 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <FaRedoAlt className="text-blue-500" />
                <span className="font-medium">Sets:</span>
                <FaMinus
                  onClick={() => handleDecrement(exercise.id, "sets")}
                  className="cursor-pointer text-red-500"
                />
                <p className="font-semibold">
                  {exercise[`${currentSide.toLowerCase()}Sets`]}
                </p>
                <FaPlus
                  onClick={() => handleIncrement(exercise.id, "sets")}
                  className="cursor-pointer text-green-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <FaListOl className="text-blue-500" />
                <span className="font-medium">Reps:</span>
                <FaMinus
                  onClick={() => handleDecrement(exercise.id, "reps")}
                  className="cursor-pointer text-red-500"
                />
                <p className="font-semibold">
                  {exercise[`${currentSide.toLowerCase()}Reps`]}
                </p>
                <FaPlus
                  onClick={() => handleIncrement(exercise.id, "reps")}
                  className="cursor-pointer text-green-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-blue-500" />
                <span className="font-medium">Hold Time:</span>
                <FaMinus
                  onClick={() => handleDecrement(exercise.id, "holdTime")}
                  className="cursor-pointer text-red-500"
                />
                <p className="font-semibold">
                  {exercise[`${currentSide.toLowerCase()}HoldTime`]} s
                </p>
                <FaPlus
                  onClick={() => handleIncrement(exercise.id, "holdTime")}
                  className="cursor-pointer text-green-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Side:</span>
                <Switch
                  checked={currentSide === "Right"}
                  onChange={() => handleToggleSide(exercise.id)}
                />
              </div>
              <button
                onClick={() => handleDuplicate(exercise.id)}
                disabled={exercise.isDuplicated}
                className={`mt-2 sm:mt-0 px-4 py-2 rounded text-white font-semibold ${
                  exercise.isDuplicated
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Duplicate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;
