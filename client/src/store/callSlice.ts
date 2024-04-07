import { createSlice } from "@reduxjs/toolkit";
import { User } from "./chatSlice";

interface CallObj {
  pk: string;
  sk: string;
  id: string;
  sk1: string;
  sk2: string;
  gsi1Pk: string;
  gsi1Sk: string;
  type: string;
  chatId: string;
  sender: User;
  receiver: User;
  kind: string;
  callType: string;
  status: string;
  participants: User[];
  createdAt: string;
  updatedAt: string;
  callId: string;
}


export interface CallState {
  callObj: CallObj | null,
  callScreen: boolean,
  incoming: boolean,
  isCalling: boolean,
  answered: boolean,
  callEnded: boolean,
  mute: boolean,
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
