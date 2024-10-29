import React, { useState } from "react";

const Switch = () => {
  const [isLeft, setIsLeft] = useState(true);

  return (
    <div
      className="flex items-center p-1 text-sm bg-gray-200 rounded-full w-32 border border-blue-200  cursor-pointer"
      onClick={() => setIsLeft(!isLeft)}
    >
      {/* Left Side */}
      <div
        className={`flex-1 text-center py-1 rounded-full ${
          isLeft
            ? "bg-blue-500 text-white transition-all ease-in-out duration-500"
            : "text-gray-500 transition-all ease-in-out duration-500"
        }`}
      >
        Left
      </div>

      {/* Right Side */}
      <div
        className={`flex-1 text-center py-1 rounded-full ${
          !isLeft
            ? "bg-blue-500 text-white transition-all ease-in-out duration-500"
            : "text-gray-500 transition-all ease-in-out duration-500"
        }`}
      >
        Right
      </div>
    </div>
  );
};

export default Switch;
