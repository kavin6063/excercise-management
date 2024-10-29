import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomInstructions } from "../redux/exerciseSlice";

const CustomMessage = () => {
  const dispatch = useDispatch();
  const customInstructions = useSelector(
    (state) => state.exercises.customInstructions
  );

  const handleInstructionsChange = (e) => {
    dispatch(updateCustomInstructions(e.target.value));
  };
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <label className="block text-gray-700 font-semibold mb-2">
        Custom Instructions:
      </label>
      <textarea
        value={customInstructions}
        onChange={handleInstructionsChange}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        rows="4"
        placeholder="Enter any custom instructions for the program"
      />
    </div>
  );
};

export default CustomMessage;
