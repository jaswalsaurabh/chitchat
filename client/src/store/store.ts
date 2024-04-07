import { configureStore } from "@reduxjs/toolkit";
import callSlice, { CallState } from "./callSlice";
import chatSlice, { ChatState, fetchChatHistory } from "./chatSlice";
import authSlice, { AuthState } from "./authSlice";
import requestSlice, { RequestState } from "./requestSlice";


export interface ReduxState {
  CallSlice: CallState,
  ChatSlice: ChatState,
  AuthSlice: AuthState
  RequestSlice: RequestState
}

const store = configureStore({
  reducer: {
    CallSlice: callSlice,
    ChatSlice: chatSlice,
    AuthSlice: authSlice,
    RequestSlice: requestSlice
  },
});


export default store;

export type AppDispatch = typeof store.dispatch