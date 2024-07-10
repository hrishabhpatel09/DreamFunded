import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  chat: null,
  groups: null
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
    selectChat: (state, action) => {
      state.chat = action.payload;
    },
    setGroup: (state, action)=>{
      state.groups = action.payload;
    },
    addMessage: (state, action)=>{
      state.groups.forEach((grp)=>{
        if(grp._id == action.payload.id){
          grp.messages.push(action.payload.message);
        }
      })
    }
  },
});

export const { login, logout,selectChat,setGroup,addMessage } = userSilce.actions;
export default userSilce.reducer;
