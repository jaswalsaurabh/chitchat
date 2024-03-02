import { fetchAuthSession } from "@aws-amplify/auth";
import { createSlice } from "@reduxjs/toolkit";
import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";

// @ts-ignore
Amplify.configure({ ...awsconfig });

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

export function getAuth() {
  return function getAuthThunk(dispatch, getState) {
    fetchAuthSession()
      .then((res) => {
        console.log("res in auth thunk ", res);
        dispatch();
      })
      .catch((err) => {
        console.log("this is err in auth thunk", err);
      });
  };
}
