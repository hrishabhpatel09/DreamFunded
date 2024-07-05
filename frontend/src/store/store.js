import { configureStore } from "@reduxjs/toolkit";
import userSlice, { login } from "./userSlice.js";

const store = configureStore({
  reducer: userSlice,
});

export default store;
