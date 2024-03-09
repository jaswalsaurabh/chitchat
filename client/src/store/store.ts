import { configureStore } from "@reduxjs/toolkit";
import callSlice from "./callSlice";

const store = configureStore({
  reducer: {
    CallSlice: callSlice,
  },
});

export default store;
