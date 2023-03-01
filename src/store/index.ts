import {configureStore} from '@reduxjs/toolkit';
import personReducer from 'store/features/person/person';
import churchReducer from 'store/features/church/church';

export const store = configureStore({
  reducer: {
    person: personReducer,
    church: churchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
