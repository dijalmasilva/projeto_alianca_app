import {createAsyncThunk} from '@reduxjs/toolkit';
import httpClient from 'utils/http-client';
import EventCreateDto from 'models/event/event-create.dto';

const getEventsOfWeek = () => {};

type CreateEventType = {
  token: string;
  event: EventCreateDto;
};

const createEvent = createAsyncThunk(
  'event/createEvent',
  async (props: CreateEventType, {rejectWithValue}) => {
    const {token, event} = props;

    return await httpClient(token)
      .post('/event', event)
      .then(res => res.data)
      .catch(rejectWithValue);
  },
);

const EventService = {
  getEventsOfWeek,
  createEvent,
};

export default EventService;
