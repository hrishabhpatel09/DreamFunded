import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};
const userSilce = createSlice({
  name: "User",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSilce.actions;
export default userSilce.reducer;
