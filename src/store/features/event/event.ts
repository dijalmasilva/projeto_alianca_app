import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Event} from '@prisma/client';
import PersonService from 'store/features/person/person-service';

type EventState = {
  loading: boolean;
  event?: Event;
  eventsByDay: Event[];
  eventsByWeek: Event[];
  eventsByMonth: Event[];
};

const initialState: EventState = {
  loading: false,
  event: undefined,
  eventsByDay: [],
  eventsByWeek: [],
  eventsByMonth: [],
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(PersonService.logout.fulfilled, () => initialState);
  },
});

export const EventActions = eventSlice.actions;
export default eventSlice.reducer;
