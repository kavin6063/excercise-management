import { useState } from "react";

import {
  ExerciseDropdown,
  ExerciseList,
  ExerciseForm,
  CustomMessage,
  WeekdaySelector,
} from "../components";

const ExerciseProgramPage = () => {
  return (
    <>
      <div className="container mx-auto min-h-96 p-4">
        <h1 className="text-2xl font-bold mb-4">Exercise Planner</h1>

        {/* Flex container for dropdown and form, with responsive and justify-between styling */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
          <div className="w-full sm:w-1/2">
            <ExerciseDropdown />
          </div>
          <div className="w-full sm:w-1/2">
            <ExerciseForm />
          </div>
        </div>

        <div className="max-w-screen-lg ">
          <ExerciseList />
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="flex flex-col gap-4">
          <WeekdaySelector />
          <CustomMessage /> {/* Display the custom message input */}
        </div>
      </div>
    </>
  );
};

export default ExerciseProgramPage;
