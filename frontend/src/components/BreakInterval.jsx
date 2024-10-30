// BreakInterval.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  incrementBreakInterval,
  decrementBreakInterval,
} from "../redux/exerciseSlice";

const BreakInterval = () => {
  const dispatch = useDispatch();
  const breakInterval = useSelector((state) => state.exercises.breakInterval);

  return (
    <div className="flex items-center justify-center space-x-4 p-4 border border-gray-300 rounded-lg shadow-sm max-w-md mx-auto">
      <button
        onClick={() => dispatch(decrementBreakInterval())}
        className="p-2 bg-gray-100 text-red-500 rounded-full hover:bg-red-100 transition-colors"
      >
        <FaMinus size={18} />
      </button>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-700">
          Break Interval (seconds):
        </h3>
        <span className="text-2xl font-bold text-blue-500">
          {breakInterval}
        </span>
      </div>

      <button
        onClick={() => dispatch(incrementBreakInterval())}
        className="p-2 bg-gray-100 text-green-500 rounded-full hover:bg-green-100 transition-colors"
      >
        <FaPlus size={18} />
      </button>
    </div>
  );
};

export default BreakInterval;
