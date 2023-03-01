import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'store/index';
import PersonService from 'store/features/person/person-service';
import {Person} from 'types/Person';

type PersonSliceState = {
  loading: boolean;
  me: Person;
  auth: {
    accessToken?: string;
    code?: string;
    error?: any;
  };
};

const initialState: PersonSliceState = {
  loading: false,
  me: {
    id: '',
    name: '',
    phoneNumber: '',
    birthday: '',
    hasAlliance: false,
    picture: '',
    roles: [],
    churchs: [],
  },
  auth: {
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iis1NTgzOTk4MDU4OTcxIiwic3ViIjoiNzhkMTAwOWEtOTIwMy00YTdlLWI0MzctYWQxODFmZTBjY2I0Iiwicm9sZXMiOlsiVklTSVRBTlRFIiwiQURNSU4iLCJQQVNUT1IiLCJMRVZJVEEiLCJMw41ERVIiLCJPVkVMSEEiXSwibmFtZSI6IiIsImlhdCI6MTY3NzY0MjMyNiwiZXhwIjoxNjgwMzIwNzI2fQ.YVkoqiFOawp6y9UBCbnH-lTV3EoANeD8GVuNR2EIlDI',
    code: '',
    error: undefined,
  },
};

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    updateMe: (state, action: PayloadAction<Person>) => {
      state.me = action.payload;
    },
    setMyPhoneNumber: (state, action: PayloadAction<string>) => {
      state.me.phoneNumber = action.payload;
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.auth.accessToken = action.payload;
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
    builder.addCase(PersonService.getProfile.pending, state => {
      state.loading = true;
    });
    builder.addCase(PersonService.getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.me = action.payload;
    });
    builder.addCase(PersonService.getProfile.rejected, state => {
      state.loading = false;
    });
  },
});

const personReducer = personSlice.reducer;
export const {updateMe, setMyPhoneNumber, updateAccessToken} =
  personSlice.actions;

export const personLoadingSelector = (state: RootState): boolean =>
  state.person.loading;

export const accessTokenSelector = (state: RootState): string =>
  state.person.auth.accessToken || '';

export const profileSelector = (state: RootState): Person => state.person.me;

export default personReducer;
