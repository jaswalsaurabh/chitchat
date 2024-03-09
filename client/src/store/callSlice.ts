import { createSlice } from "@reduxjs/toolkit";

const initialState = { callObj: null, isCalling: false };

const CallSlice = createSlice({
  name: "callSlice",
  initialState,
  reducers: {
    updateCallState(state, action) {
      const { callObj, isCalling } = action.payload;
      return { ...state, callObj, isCalling };
    },
  },
});

export const { updateCallState } = CallSlice.actions;

export default CallSlice.reducer;
