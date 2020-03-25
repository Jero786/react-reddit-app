import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {reducer as homeReducer} from '../features/home';

export const store = configureStore({
    reducer: {
        home: homeReducer,
    },
    preloadedState: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
