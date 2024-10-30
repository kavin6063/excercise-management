// DailyFrequency.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  incrementDailyFrequency,
  decrementDailyFrequency,
} from "../redux/exerciseSlice";

const DailyFrequency = () => {
  const dispatch = useDispatch();
  const dailyFrequency = useSelector((state) => state.exercises.dailyFrequency);

  return (
    <div className="flex items-center justify-center space-x-4 p-4 border border-gray-300 rounded-lg shadow-sm max-w-md mx-auto">
      <button
        onClick={() => dispatch(decrementDailyFrequency())}
        className="p-2 bg-gray-100 text-red-500 rounded-full hover:bg-red-100 transition-colors"
      >
        <FaMinus size={18} />
      </button>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-700">
          Sessions per Day:
        </h3>
        <span className="text-2xl font-bold text-blue-500">
          {dailyFrequency}
        </span>
      </div>

      <button
        onClick={() => dispatch(incrementDailyFrequency())}
        className="p-2 bg-gray-100 text-green-500 rounded-full hover:bg-green-100 transition-colors"
      >
        <FaPlus size={18} />
      </button>
    </div>
  );
};

export default DailyFrequency;
