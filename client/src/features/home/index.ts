import { createSlice } from '@reduxjs/toolkit';
import { initialState, reducers } from './reducers';

const slice = createSlice({
  name: 'HomePage',
  initialState,
  reducers,
});

export const { actions, reducer } = slice;
