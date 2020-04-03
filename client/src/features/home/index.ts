import { createSlice } from "@reduxjs/toolkit";
import { initialState, reducers } from "./reducers";

const slice = createSlice({
  name: "HomePage",
  initialState,
  reducers,
});

export const actions = slice.actions;
export const reducer = slice.reducer;
