import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import PersonService from 'store/features/person/person-service';
import {Departament, Person} from '@prisma/client';
import {_storeToken} from 'utils/storage';

export type PersonProfile = Omit<Person, 'createdAt'> & {
  departamentsAsLeader: Departament[];
  departamentsAsMember: Departament[];
};

type PersonSliceState = {
  loading: boolean;
  me: PersonProfile;
  auth: {
    accessToken?: string;
    code?: string;
    error?: any;
  };
};

const initialState: PersonSliceState = {
  loading: false,
  me: {
    id: 0,
    name: '',
    phoneNumber: '',
    birthday: '',
    hasAlliance: false,
    picture: '',
    roles: [],
    active: false,
    address_neighborhood: '',
    address_city: '',
    address_state: '',
    address_number: '',
    address_street: '',
    address_zipcode: '',
    departamentsAsLeader: [],
    departamentsAsMember: [],
  },
  auth: {
    accessToken: '',
    code: '',
    error: undefined,
  },
};

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    updateMe: (state, action: PayloadAction<PersonProfile>) => {
      state.me = action.payload;
    },
    setMyPhoneNumber: (state, action: PayloadAction<string>) => {
      state.me.phoneNumber = action.payload;
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      (async () => {
        await _storeToken(token);
      })();
      state.auth.accessToken = token;
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
      state.me = {...state.me, ...action.payload};
    });
    builder.addCase(PersonService.getProfile.rejected, state => {
      state.loading = false;
    });
    builder.addCase(
      PersonService.getDepartaments.fulfilled,
      (state, action) => {
        state.loading = false;
        state.me.departamentsAsLeader = action.payload.departamentsAsLeader;
        state.me.departamentsAsMember = action.payload.departamentsAsMember;
      },
    );
    builder.addCase(PersonService.getDepartaments.pending, state => {
      state.loading = true;
    });
    builder.addCase(PersonService.getDepartaments.rejected, state => {
      state.loading = false;
    });
    builder.addCase(PersonService.logout.fulfilled, () => initialState);
  },
});

const personReducer = personSlice.reducer;
export const PersonActions = personSlice.actions;

export default personReducer;
