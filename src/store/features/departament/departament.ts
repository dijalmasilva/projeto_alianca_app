import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Departament} from '@prisma/client';
import DepartamentService from './departament-service';
import PersonService from 'store/features/person/person-service';

type DepartamentState = {
  loading: boolean;
  departament?: Departament;
  departamentsByChurch: Departament[];
  departamentsOnUserLoggedWasNotIncluded: Departament[];
};

const initialState: DepartamentState = {
  loading: false,
  departament: undefined,
  departamentsByChurch: [],
  departamentsOnUserLoggedWasNotIncluded: [],
};

const departamentSlice = createSlice({
  name: 'departament',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      DepartamentService.getDepartamentsImNotIncluded.fulfilled,
      (state, action: PayloadAction<Departament[]>) => {
        state.loading = false;
        state.departamentsOnUserLoggedWasNotIncluded = action.payload;
      },
    );
    builder.addCase(
      DepartamentService.getDepartamentsImNotIncluded.pending,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      DepartamentService.getDepartamentsImNotIncluded.rejected,
      state => {
        state.loading = false;
      },
    );
    builder.addCase(PersonService.logout.fulfilled, () => initialState);
  },
});

export default departamentSlice.reducer;
