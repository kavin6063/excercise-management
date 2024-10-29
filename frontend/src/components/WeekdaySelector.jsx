import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedDays } from "../redux/exerciseSlice";

const weekdays = [
  { id: 1, name: "Mon" },
  { id: 2, name: "Tue" },
  { id: 3, name: "Wed" },
  { id: 4, name: "Thur" },
  { id: 5, name: "Fri" },
  { id: 6, name: "Sat" },
  { id: 7, name: "Sun" },
];

const WeekdaySelector = () => {
  const dispatch = useDispatch();
  const selectedDays = useSelector((state) => state.exercises.selectedDays);

  const toggleDay = (name) => {
    const updatedDays = selectedDays.includes(name)
      ? selectedDays.filter((day) => day !== name)
      : [...selectedDays, name];
    dispatch(updateSelectedDays(updatedDays));
  };
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Select Days of the Week</h2>
      <div className="flex flex-row items-end space-x-3">
        {weekdays.map((day) => (
          <label key={day.id} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedDays.includes(day.name)}
              onChange={() => toggleDay(day.name)}
              className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-lg">{day.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default WeekdaySelector;
