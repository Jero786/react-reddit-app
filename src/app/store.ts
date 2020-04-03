import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { reducer as homeReducer } from '../features/home';
import { saveSession } from '../commons/middlewares/saveSession';

export const store = configureStore({
  reducer: {
    home: homeReducer,
  },
  preloadedState: {},
  middleware: [...getDefaultMiddleware(), saveSession],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
