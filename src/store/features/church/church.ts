import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Church} from 'types/Church';
import ChurchService from 'store/features/church/church-service';
import {RootState} from 'store/index';

type ChurchState = {
  loading: boolean;
  churchs: Church[];
};

const initialState: ChurchState = {
  loading: false,
  churchs: [],
};

const churchSlice = createSlice({
  name: 'church',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(ChurchService.getChurchs.pending, state => {
      state.loading = true;
    });
    builder.addCase(ChurchService.getChurchs.rejected, state => {
      state.loading = false;
    });
    builder.addCase(
      ChurchService.getChurchs.fulfilled,
      (state, action: PayloadAction<Church[]>) => {
        (state.loading = false), (state.churchs = action.payload);
      },
    );
  },
});

const churchReducer = churchSlice.reducer;

export const churchsSelector = (state: RootState) => state.church.churchs;

export default churchReducer;
