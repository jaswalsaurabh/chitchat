import { configureStore } from "@reduxjs/toolkit";
import callSlice from "./callSlice";
import chatSlice from "./chatSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    CallSlice: callSlice,
    ChatSlice: chatSlice,
    AuthSlice: authSlice
  },
});

export default store;
