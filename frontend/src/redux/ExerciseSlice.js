// exerciseSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async actions
export const fetchPrograms = createAsyncThunk(
  "exercises/fetchPrograms",
  async () => {
    const response = await fetch("http://localhost:3001/api/exercises");
    return response.json();
  }
);

export const deleteProgram = createAsyncThunk(
  "exercises/deleteProgram",
  async (id) => {
    await fetch(`http://localhost:3001/api/exercises/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

// Initial state
const initialState = {
  exercises: [],
  savedPrograms: [],
  selectedDays: [],
  customInstructions: "",
};

// Slice definition
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
          exercises: [...state.exercises],
          instructions: customInstructions,
          selectedDays: [...state.selectedDays],
        });
      }
    },
    clearExercises: (state) => {
      state.exercises = [];
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.savedPrograms = action.payload;
      })
      .addCase(deleteProgram.fulfilled, (state, action) => {
        state.savedPrograms = state.savedPrograms.filter(
          (prog) => prog.id !== action.payload
        );
      });
  },
});

// Export actions
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
