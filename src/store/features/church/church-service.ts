import {createAsyncThunk} from '@reduxjs/toolkit';
import httpClient from 'utils/http-client';
import {Prisma} from '@prisma/client';

const getChurchs = createAsyncThunk(
  'church/findAll',
  async (accessToken: string, {rejectWithValue}) => {
    return await httpClient(accessToken)
      .get('/church')
      .then(res => res.data)
      .catch(() => {
        return rejectWithValue('Erro ao buscar igrejas cadastradas');
      });
  },
);

type CreateChurchType = {
  token: string;
  church: Prisma.ChurchCreateInput;
};

const createChurch = createAsyncThunk(
  'church/create',
  async (data: CreateChurchType, {rejectWithValue}) => {
    return await httpClient(data.token)
      .post('/church', data.church)
      .then(res => res)
      .catch(rejectWithValue);
  },
);

const ChurchService = {
  getChurchs,
  createChurch,
};

export default ChurchService;
