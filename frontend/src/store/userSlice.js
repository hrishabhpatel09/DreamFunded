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
      // groupId --> from action.payload
      // message --> from action.message
      state.groups = state.groups.map((group, idx)=>{
        if(group._id == action.payload.groupId){
          return group = {...group,messages: [...group.messages, action.payload.message]};
        }
        else{
          return group;
        }
      })
    }
  },
});

export const { login, logout,selectChat,setGroup,addMessage } = userSilce.actions;
export default userSilce.reducer;
