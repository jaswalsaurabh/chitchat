import { createSlice } from "@reduxjs/toolkit";

const initialState = { authObj: null, loading: false };

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    updateAuth(state, action) {
      return { ...state, authObj: action.payload };
    },
  },
});

export const { updateAuth } = AuthSlice.actions;

export default AuthSlice.reducer;

