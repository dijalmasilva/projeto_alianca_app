import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type PersonSliceState = {
  me: {
    name: string;
    phoneNumber: string;
  };
};

const initialState: PersonSliceState = {
  me: {
    name: '',
    phoneNumber: '',
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
});
const personReducer = personSlice.reducer;
export const {updateMe, setMyPhoneNumber} = personSlice.actions;

export default personReducer;
