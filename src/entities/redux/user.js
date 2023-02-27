import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  _id: "",
  fullName: "",
  email: "",
  avatarUrl: "",
  createdAt: "",
  updatedAt: "",
  __v: 0,
  token: "",
};

const userSlice = createSlice({
  name: "@@user",
  initialState,
  reducers: {
    setAll: (_, action) => action.payload,
    setClear: () => initialState,
  },
});

export const { setAll, setClear } = userSlice.actions;

export const userReducer = userSlice.reducer;
export const selectUser = (state) => state.user;
export const selectToken = (state) => state.user.token;
