import React from "react";
import { ExerciseDropdown, ExerciseList, ExerciseForm } from "../components";

const ExcerciseProgramPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Exercise Planner</h1>
      <div className="flex justify-between ">
        <ExerciseDropdown />
        <ExerciseForm />
      </div>
      <ExerciseList />
    </div>
  );
};

export default ExcerciseProgramPage;
