import {createAsyncThunk} from '@reduxjs/toolkit';
import httpClient from 'utils/http-client';

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

const ChurchService = {
  getChurchs,
};

export default ChurchService;
