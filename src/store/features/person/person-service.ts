import {createAsyncThunk} from '@reduxjs/toolkit';
import httpClient from 'utils/http-client';

const requestCode = createAsyncThunk(
  'auth/requestCode',
  async (phoneNumber: string, {rejectWithValue}) => {
    try {
      return await httpClient()
        .post('/auth/code', {phoneNumber})
        .then(res => res.data);
    } catch (e) {
      rejectWithValue('Não foi possível gerar o código');
    }
  },
);

const PersonService = {
  requestCode,
};

export default PersonService;
