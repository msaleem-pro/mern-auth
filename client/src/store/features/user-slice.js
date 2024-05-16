import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },

    signInSuccess: (state, actions) => {
      state.loading = false;
      state.user = actions.payload;
    },

    signInFail: (state) => {
      state.loading = false;
    },

    userLogout: (state) => {
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { signInStart, signInSuccess, signInFail, userLogout } =
  userSlice.actions;

export default userSlice.reducer;
