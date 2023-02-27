import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'store/index';
import PersonService from 'store/features/person/person-service';

type PersonSliceState = {
  loading: boolean;
  me: {
    name: string;
    phoneNumber: string;
  };
  auth: {
    access_token?: string;
    code?: string;
    error?: any;
  };
};

const initialState: PersonSliceState = {
  loading: false,
  me: {
    name: '',
    phoneNumber: '',
  },
  auth: {
    access_token: '',
    code: '',
    error: undefined,
  },
};

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    updateMe: (state, action: PayloadAction<typeof initialState.me>) => {
      state.me = action.payload;
    },
    setMyPhoneNumber: (state, action: PayloadAction<string>) => {
      state.me.phoneNumber = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(PersonService.requestCode.pending, state => {
      state.loading = true;
    });
    builder.addCase(PersonService.requestCode.fulfilled, (state, action) => {
      const {payload} = action;
      state.loading = false;
      state.auth.code = payload;
    });
    builder.addCase(PersonService.requestCode.rejected, (state, action) => {
      state.loading = false;
      const {payload} = action;
      state.auth.error = payload;
    });
  },
});

const personReducer = personSlice.reducer;
export const {updateMe, setMyPhoneNumber} = personSlice.actions;

export const personLoadingSeletor = (state: RootState): boolean =>
  state.person.loading;

export default personReducer;
