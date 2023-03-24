import {createAsyncThunk} from '@reduxjs/toolkit';
import httpClient from 'utils/http-client';
import {Prisma} from '@prisma/client';

type DepartamentImNotIncludeType = {
  personId: number;
  token: string;
};

const getDepartamentsImNotIncluded = createAsyncThunk(
  'departament/person/notInclude',
  async (props: DepartamentImNotIncludeType, {rejectWithValue}) => {
    return await httpClient(props.token)
      .get(`/departament/person/${props.personId}/not`)
      .then(res => res.data)
      .catch(rejectWithValue);
  },
);

type DepartamentCreateType = {
  token: string;
  departament: Prisma.DepartamentCreateInput;
};

const createDepartament = createAsyncThunk(
  'departament/create',
  async (props: DepartamentCreateType, {rejectWithValue}) => {
    return await httpClient(props.token)
      .post('/departament', props.departament)
      .then(res => res.data)
      .catch(rejectWithValue);
  },
);

type DepartamentUpdateType = {
  token: string;
  departamentId: number;
  departament: Prisma.DepartamentUpdateInput;
};

const updateDepartament = createAsyncThunk(
  'departament/update',
  async (props: DepartamentUpdateType, {rejectWithValue}) => {
    return await httpClient(props.token)
      .put(`/departament/${props.departamentId}`, props.departament)
      .then(res => res.data)
      .catch(rejectWithValue);
  },
);

const DepartamentService = {
  createDepartament,
  updateDepartament,
  getDepartamentsImNotIncluded,
};

export default DepartamentService;
