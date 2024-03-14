import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../validations/Types";

// Instead of user, a JWToken will be here this is just a test for the client at the moment

interface AuthState {
  userInfo: User | null;
}

const initialState: AuthState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { loginAction, logout } = authSlice.actions;
export default authSlice.reducer;
