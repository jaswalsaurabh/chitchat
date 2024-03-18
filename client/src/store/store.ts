import { configureStore } from "@reduxjs/toolkit";
import callSlice, { CallState } from "./callSlice";
import chatSlice, { ChatState } from "./chatSlice";
import authSlice, { AuthState } from "./authSlice";


export interface ReduxState {
  CallSlice: CallState,
  ChatSlice: ChatState,
  AuthSlice: AuthState
}

const store = configureStore({
  reducer: {
    CallSlice: callSlice,
    ChatSlice: chatSlice,
    AuthSlice: authSlice
  },
});

export default store;
