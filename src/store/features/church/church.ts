import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import ChurchService from 'store/features/church/church-service';
import {Church} from '@prisma/client';

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
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addChurchOrUpdate: (state, action: PayloadAction<Church>) => {
      const newChurchOrUpdate = action.payload;

      const churchs = state.churchs;
      const churchsResult = churchs.filter(c => c.id !== newChurchOrUpdate.id);

      churchsResult.push(newChurchOrUpdate);
      state.churchs = churchsResult;
    },
  },
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
        state.loading = false;
        state.churchs = action.payload;
      },
    );
  },
});

const churchReducer = churchSlice.reducer;
export const ChurchActions = churchSlice.actions;

export default churchReducer;
