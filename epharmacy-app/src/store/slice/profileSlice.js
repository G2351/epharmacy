import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userId: null,
    email: null,
    name: null,
    phone: null,
    address: null,
  },
  reducers: {
    setProfileRedux: (state, action) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.phone = action.payload.phone || null;
      state.address = action.payload.address || null;
    },
    setNameRedux: (state, action) => {
      state.name = action.payload.name;
      if (action.payload.phone !== undefined) state.phone = action.payload.phone;
      if (action.payload.address !== undefined) state.address = action.payload.address;
    },
    clearProfileRedux: (state) => {
      state.userId = null;
      state.email = null;
      state.name = null;
      state.phone = null;
      state.address = null;
    },
  },
});

export const { setProfileRedux, clearProfileRedux, setNameRedux } = profileSlice.actions;
export default profileSlice.reducer;