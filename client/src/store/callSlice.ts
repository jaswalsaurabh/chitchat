import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  callObj: null,
  callScreen: false,
  incoming: false,
  isCalling: false,
  answered: false,
};

const CallSlice = createSlice({
  name: "callSlice",
  initialState,
  reducers: {
    updateCallState(state, action) {
      return { ...state, ...action.payload };
    },
    addEventsData(state, action) {
      const { key, payload } = action.payload;
      return { ...state, [key]: payload };
    },
  },
});

export const { updateCallState, addEventsData } = CallSlice.actions;

export default CallSlice.reducer;
