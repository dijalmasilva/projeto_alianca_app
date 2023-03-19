import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Departament} from '@prisma/client';

type DepartamentState = {
  loading: boolean;
  departament?: Departament;
  departamentsByChurch: Departament[];
};

const initialState: DepartamentState = {
  loading: false,
  departament: undefined,
  departamentsByChurch: [],
};

const departamentSlice = createSlice({
  name: 'departament',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: () => {},
});

export default departamentSlice.reducer;
