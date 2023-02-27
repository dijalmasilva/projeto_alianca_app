import {configureStore} from '@reduxjs/toolkit';
import personReducer from 'store/features/person';

export const store = configureStore({
  reducer: {
    person: personReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
