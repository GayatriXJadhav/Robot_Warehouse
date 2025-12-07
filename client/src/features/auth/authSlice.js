import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: [], // store all registered users
    user: null, // currently logged-in user
    isLoggedIn: false,
    loading: false,
    error: null,
  },
  reducers: {
    signup: (state, action) => {
      state.users.push(action.payload);
    },

    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },

    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    }
  },
});

export const { signup, loginStart, loginSuccess, loginFailure, logout, updateProfile } =
  authSlice.actions;

export default authSlice.reducer;
