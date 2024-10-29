import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from "./exerciseSlice";

export const store = configureStore({
  reducer: {
    exercises: exerciseReducer,
  },
});

export default store;
