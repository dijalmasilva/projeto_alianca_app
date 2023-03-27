import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Department} from '@prisma/client';
import DepartmentService from 'store/features/department/department-service';
import PersonService from 'store/features/person/person-service';

type DepartmentState = {
  loading: boolean;
  department?: Department;
  departmentsByChurch: Department[];
  departmentsOnUserLoggedWasNotIncluded: Department[];
};

const initialState: DepartmentState = {
  loading: false,
  department: undefined,
  departmentsByChurch: [],
  departmentsOnUserLoggedWasNotIncluded: [],
};

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      DepartmentService.getDepartmentsImNotIncluded.fulfilled,
      (state, action: PayloadAction<Department[]>) => {
        state.loading = false;
        state.departmentsOnUserLoggedWasNotIncluded = action.payload;
      },
    );
    builder.addCase(
      DepartmentService.getDepartmentsImNotIncluded.pending,
      state => {
        state.loading = true;
      },
    );
    builder.addCase(
      DepartmentService.getDepartmentsImNotIncluded.rejected,
      state => {
        state.loading = false;
      },
    );
    builder.addCase(PersonService.logout.fulfilled, () => initialState);
  },
});

export default departmentSlice.reducer;
