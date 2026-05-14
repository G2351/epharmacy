import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";
export const countOrderSlice = createSlice({
  name: "countOrder",
  initialState: {
    count: 0,
  },
  reducers: {
    increaseCount: (state, action) => {
      state.count = state.count + 1;
    },
    descreaseCount: (state, action) => {
      state.count = state.count - 1;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { increaseCount, descreaseCount, setCount } =
  countOrderSlice.actions;
export default countOrderSlice.reducer;
