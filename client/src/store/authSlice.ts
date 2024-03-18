import { createSlice } from "@reduxjs/toolkit";

interface AuthObj {
  auth_time: number;
  client_id: string;
  event_id: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  origin_jti: string;
  scope: string;
  sub: string;
  token_use: string;
  username: string;
}

export interface AuthState {
  authObj: AuthObj | null;
  authLoading: boolean
}

const initialState = { authObj: null, authLoading: false };

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

