import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";

// ─── Redux store──────────────────────────────────────
const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
  // Redux DevTools enabled automatically in development
  devTools: process.env.NODE_ENV !== "production",
});

export default store;