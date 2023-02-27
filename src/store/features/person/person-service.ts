import {createAsyncThunk} from '@reduxjs/toolkit';
import httpClient from 'utils/http-client';

const requestCode = createAsyncThunk(
  'auth/requestCode',
  async (phoneNumber: string, {rejectWithValue}) => {
    return await httpClient()
      .post('/auth/code', {phoneNumber})
      .then(res => res.data)
      .catch(error => {
        const {status} = error;
        console.log(status);
        if (status === 404) {
          return rejectWithValue('Telefone não encontrado');
        }
        return rejectWithValue(
          'Erro ao tentar solicitar o código. Tente novamente mais tarde!',
        );
      });
  },
);

const PersonService = {
  requestCode,
};

export default PersonService;
