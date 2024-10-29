// exerciseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exercises: [],
  savedPrograms: [],
  selectedDays: [],
};

const exerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    addExercise: (state, action) => {
      state.exercises.push({
        ...action.payload,
        leftSets: action.payload.sets,
        leftReps: action.payload.reps,
        leftHoldTime: action.payload.holdTime,
        rightSets: null,
        rightReps: null,
        rightHoldTime: null,
        isDuplicated: false,
      });
    },
    updateExerciseParam: (state, action) => {
      const { id, side, name, value } = action.payload;
      const exercise = state.exercises.find((ex) => ex.id === id);
      if (exercise) {
        exercise[`${side}${name.charAt(0).toUpperCase() + name.slice(1)}`] =
          value;
      }
    },
    incrementParam: (state, action) => {
      const { id, side, name } = action.payload;
      const exercise = state.exercises.find((ex) => ex.id === id);
      if (
        exercise &&
        exercise[`${side}${name.charAt(0).toUpperCase() + name.slice(1)}`] !==
          undefined
      ) {
        exercise[`${side}${name.charAt(0).toUpperCase() + name.slice(1)}`] += 1;
      }
    },
    decrementParam: (state, action) => {
      const { id, side, name } = action.payload;
      const exercise = state.exercises.find((ex) => ex.id === id);
      if (
        exercise &&
        exercise[`${side}${name.charAt(0).toUpperCase() + name.slice(1)}`] > 0
      ) {
        exercise[`${side}${name.charAt(0).toUpperCase() + name.slice(1)}`] -= 1;
      }
    },
    duplicateSide: (state, action) => {
      const { id } = action.payload;
      const exercise = state.exercises.find((ex) => ex.id === id);
      if (exercise && !exercise.isDuplicated) {
        exercise.rightSets = exercise.leftSets;
        exercise.rightReps = exercise.leftReps;
        exercise.rightHoldTime = exercise.leftHoldTime;
        exercise.isDuplicated = true;
      }
    },
    reorderExercises: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [movedExercise] = state.exercises.splice(sourceIndex, 1);
      state.exercises.splice(destinationIndex, 0, movedExercise);
    },
    saveProgram: (state, action) => {
      const { programName, customInstructions } = action.payload;
      if (programName && state.exercises.length > 0) {
        state.savedPrograms.push({
          programName,
          exercises: [...state.exercises], // Make a copy of the current exercises
          instructions: customInstructions,
          selectedDays: [...state.selectedDays],
        });
      }
    },
    clearExercises: (state) => {
      state.exercises = []; // Clear all exercises
    },
    updateCustomInstructions: (state, action) => {
      state.customInstructions = action.payload;
    },
    setCustomInstructions: (state, action) => {
      state.customInstructions = action.payload;
    },
    updateSelectedDays: (state, action) => {
      state.selectedDays = action.payload;
    },
  },
});

export const {
  addExercise,
  updateExerciseParam,
  incrementParam,
  decrementParam,
  duplicateSide,
  reorderExercises,
  saveProgram,
  clearExercises,
  updateCustomInstructions,
  setCustomInstructions,
  updateSelectedDays,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
