import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import assessmentReducer from "./assessmentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    assessment: assessmentReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;