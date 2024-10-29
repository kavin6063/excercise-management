import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementParam,
  decrementParam,
  duplicateSide,
  updateExerciseParam,
  reorderExercises,
} from "../redux/exerciseSlice";
import { FaPlus, FaMinus } from "react-icons/fa";
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
    <div>
      <div ref={listRef}>
        {exercises.map((exercise, index) => (
          <div key={exercise.id} className="flex flex-col gap-2 mb-4">
            <h1 className="p-2 font-semibold text-xl">{exercise.name}</h1>
            <div className="flex gap-4 p-6 bg-slate-200 rounded-lg">
              <div className="p-2 flex items-center justify-center mt-2 gap-1">
                Sets:
                <FaMinus
                  onClick={() => handleDecrement(exercise.id, "sets")}
                  className="cursor-pointer"
                />
                <p>{exercise[`${currentSide.toLowerCase()}Sets`]}</p>
                <FaPlus
                  onClick={() => handleIncrement(exercise.id, "sets")}
                  className="cursor-pointer"
                />
              </div>
              <div className="p-2 flex items-center justify-center mt-2 gap-1">
                Reps:
                <FaMinus
                  onClick={() => handleDecrement(exercise.id, "reps")}
                  className="cursor-pointer"
                />
                <p>{exercise[`${currentSide.toLowerCase()}Reps`]}</p>
                <FaPlus
                  onClick={() => handleIncrement(exercise.id, "reps")}
                  className="cursor-pointer"
                />
              </div>
              <div className="p-2 flex items-center justify-center mt-2 gap-1">
                Hold Time:
                <FaMinus
                  onClick={() => handleDecrement(exercise.id, "holdTime")}
                  className="cursor-pointer"
                />
                <p>{exercise[`${currentSide.toLowerCase()}HoldTime`]} s</p>
                <FaPlus
                  onClick={() => handleIncrement(exercise.id, "holdTime")}
                  className="cursor-pointer"
                />
              </div>
              <div className="p-2 flex items-center justify-center mt-2 gap-1">
                Side:
                <Switch
                  checked={currentSide === "Right"}
                  onChange={() => handleToggleSide(exercise.id)}
                />
              </div>
              <button
                onClick={() => handleDuplicate(exercise.id)}
                disabled={exercise.isDuplicated}
                className={`mt-2 px-4 py-2 rounded ${
                  exercise.isDuplicated
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white"
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
