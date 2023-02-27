import {createAsyncThunk} from '@reduxjs/toolkit';
import httpClient from 'utils/http-client';
import {HttpStatusCode} from 'axios';

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

type AuthenticateData = {
  username: string; //phoneNumber
  password: string; //code
};

const login = createAsyncThunk(
  'auth/login',
  async (data: AuthenticateData, {rejectWithValue}) => {
    return await httpClient()
      .post('/auth/login', data)
      .then(res => res.data)
      .catch((err: any) => {
        const {response} = err;
        if (response && response.status === HttpStatusCode.Unauthorized) {
          return rejectWithValue('Código inválido');
        }

        return rejectWithValue('Não foi possível confirmar o código');
      });
  },
);

const getProfile = createAsyncThunk(
  'auth/profile',
  async (accessToken: string, {rejectWithValue}) => {
    return await httpClient(accessToken)
      .get('/auth/profile')
      .then(res => res.data)
      .catch(() => {
        return rejectWithValue('Error ao carregar dados do perfil');
      });
  },
);

const PersonService = {
  requestCode,
  login,
  getProfile,
};

export default PersonService;
