import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedDays } from "../redux/exerciseSlice";

// Define weekday options
const weekdays = [
  { id: 1, name: "Mon", placeholder: "M" },
  { id: 2, name: "Tue", placeholder: "T" },
  { id: 3, name: "Wed", placeholder: "W" },
  { id: 4, name: "Thur", placeholder: "Th" },
  { id: 5, name: "Fri", placeholder: "F" },
  { id: 6, name: "Sat", placeholder: "Sa" },
  { id: 7, name: "Sun", placeholder: "Su" },
];

const WeekdaySelector = () => {
  const dispatch = useDispatch();
  const selectedDays = useSelector((state) => state.exercises.selectedDays);

  // Toggle day selection
  const toggleDay = (name) => {
    const updatedDays = selectedDays.includes(name)
      ? selectedDays.filter((day) => day !== name)
      : [...selectedDays, name];

    // Dispatch action to update selected days in Redux
    dispatch(updateSelectedDays(updatedDays));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Select Days of the Week</h2>
      <div className="flex flex-row items-center justify-between ">
        {weekdays.map((day) => (
          <button
            key={day.id}
            onClick={() => toggleDay(day.name)}
            className={`h-12 w-12 flex items-center justify-center rounded-full font-semibold text-lg
              ${
                selectedDays.includes(day.name)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {day.placeholder}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeekdaySelector;
