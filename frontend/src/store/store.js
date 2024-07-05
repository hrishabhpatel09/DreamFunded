import { configureStore } from "@reduxjs/toolkit";
import userSlice, { login } from "./userSlice.js";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore.js";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};
const persistantUserReducer = persistReducer(persistConfig, userSlice);
export const store = configureStore({
  reducer: persistantUserReducer,
});

export const persistor = persistStore(store);
