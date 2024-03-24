import { createSlice } from "@reduxjs/toolkit";


export interface CallState {
  callObj: object | null,
  callScreen: boolean,
  incoming: boolean,
  isCalling: boolean,
  answered: boolean,
  callEnded: boolean
}

const initialState = {
  callObj: null,
  callScreen: false,
  incoming: false,
  isCalling: false,
  answered: false,
  callEnded: false
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
