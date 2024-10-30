import { useState } from "react";
import {
  ExerciseDropdown,
  ExerciseList,
  ExerciseForm,
  CustomMessage,
  WeekdaySelector,
  DailyFrequency,
  BreakInterval,
} from "../components";
import { GiHospitalCross } from "react-icons/gi";
const ExerciseProgramPage = () => {
  return (
    <>
      {/* Main container */}
      <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
        {/* Page title */}
        <h1 className="text-3xl flex justify-center gap-4 items-center font-extrabold text-[#295eb4] mb-6 text-center border-b-2 border-blue-500 pb-4">
          <GiHospitalCross size={40} /> Therapist's Program
        </h1>

        {/* Dropdown and form section */}
        <div className="flex flex-col  justify-center items-center w-full gap-6 ">
          <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
            <ExerciseDropdown />
          </div>
          <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
            <ExerciseForm />
          </div>
        </div>

        {/* Exercise list section */}
        <div className="max-w-screen-lg mx-auto flex gap-2 p-4">
          <ExerciseList />
        </div>
      </div>

      {/* Bottom container with weekday selector and custom message */}
      <div className="container mx-auto p-2">
        <div className="flex flex-col gap-6">
          <div className="p-4 flex flex-col md:flex-row justify-around items-center bg-gray-50 shadow-md rounded-lg border border-gray-200 gap-4">
            {/* Weekday Selector */}
            <div className="flex flex-col items-center w-full md:w-1/3">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Days</h3>
              <WeekdaySelector />
            </div>
            {/* Break Interval */}
            <div className="flex flex-col items-center w-full md:w-1/3">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Break Interval
              </h3>
              <BreakInterval />
            </div>
            {/* Daily Frequency */}
            <div className="flex flex-col items-center w-full md:w-1/3">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Frequency
              </h3>
              <DailyFrequency />
            </div>
          </div>

          {/* Custom Message Section */}
          <div className="p-4 bg-gray-50 shadow-md rounded-lg border border-gray-200">
            <CustomMessage />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExerciseProgramPage;
