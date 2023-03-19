import {configureStore} from '@reduxjs/toolkit';
import personReducer from './features/person/person';
import churchReducer from './features/church/church';
import eventReducer from './features/event/event';
import departamentReducer from './features/departament/departament';

export const store = configureStore({
  reducer: {
    person: personReducer,
    church: churchReducer,
    event: eventReducer,
    departament: departamentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
