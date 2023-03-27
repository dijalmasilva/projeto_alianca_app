import {createAsyncThunk} from '@reduxjs/toolkit';
import httpClient from 'utils/http-client';
import {Prisma} from '@prisma/client';

type DepartmentImNotIncludeType = {
  personId: number;
  token: string;
};

const getDepartmentsImNotIncluded = createAsyncThunk(
  'department/person/notInclude',
  async (props: DepartmentImNotIncludeType, {rejectWithValue}) => {
    return await httpClient(props.token)
      .get(`/department/person/${props.personId}/not`)
      .then(res => res.data)
      .catch(rejectWithValue);
  },
);

type DepartmentCreateType = {
  token: string;
  department: Prisma.DepartmentCreateInput;
};

const createDepartment = createAsyncThunk(
  'department/create',
  async (props: DepartmentCreateType, {rejectWithValue}) => {
    return await httpClient(props.token)
      .post('/department', props.department)
      .then(res => res.data)
      .catch(rejectWithValue);
  },
);

type DepartmentUpdateType = {
  token: string;
  departmentId: number;
  department: Prisma.DepartmentUpdateInput;
};

const updateDepartment = createAsyncThunk(
  'department/update',
  async (props: DepartmentUpdateType, {rejectWithValue}) => {
    return await httpClient(props.token)
      .put(`/department/${props.departmentId}`, props.department)
      .then(res => res.data)
      .catch(rejectWithValue);
  },
);

const DepartmentService = {
  createDepartment,
  updateDepartment,
  getDepartmentsImNotIncluded,
};

export default DepartmentService;
