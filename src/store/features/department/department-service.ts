import {createAsyncThunk} from '@reduxjs/toolkit';
import httpClient from 'utils/http-client';
import DepartmentCreateDto from 'models/department/deparment-create.dto';
import DepartmentUpdateDto from 'models/department/department-update.dto';

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
  department: DepartmentCreateDto;
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
  department: DepartmentUpdateDto;
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

type MembersIdFromDepartmentType = {
  token: string;
  departmentId: number;
};

const getMembersIdFromDepartment = createAsyncThunk(
  'department/membersId',
  async (props: MembersIdFromDepartmentType, {rejectWithValue}) => {
    return await httpClient(props.token)
      .get(`/department/${props.departmentId}/membersId`)
      .then(res => res.data as number[])
      .catch(rejectWithValue);
  },
);

const DepartmentService = {
  createDepartment,
  updateDepartment,
  getDepartmentsImNotIncluded,
  getMembersIdFromDepartment,
};

export default DepartmentService;
