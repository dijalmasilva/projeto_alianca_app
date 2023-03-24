import {createAsyncThunk} from '@reduxjs/toolkit';
import httpClient from 'utils/http-client';
import {HttpStatusCode} from 'axios';
import {Prisma} from '@prisma/client';

const requestCode = createAsyncThunk(
  'auth/requestCode',
  async (phoneNumber: string, {rejectWithValue}) => {
    return await httpClient()
      .post('/auth/code', {phoneNumber})
      .then(res => res.data)
      .catch(error => {
        const {status} = error;
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
      .post('/auth/profile')
      .then(res => res.data)
      .catch(() => {
        return rejectWithValue('Error ao carregar dados do perfil');
      });
  },
);

type UpdateProfileData = {
  accessToken: string;
  id: number;
  person: Prisma.PersonUpdateInput;
};

const updateProfile = createAsyncThunk(
  'person/profile-update',
  async (data: UpdateProfileData, {rejectWithValue}) => {
    return await httpClient(data.accessToken)
      .patch(`/person/${data.id}`, data.person)
      .then(res => res.data)
      .catch(() => {
        return rejectWithValue('Não foi possível atualizar seu perfil');
      });
  },
);

const logout = createAsyncThunk(
  'auth/logout',
  async (token: string, {rejectWithValue}) => {
    return await httpClient(token)
      .get('/auth/logout')
      .then()
      .catch(rejectWithValue);
  },
);

type GetDepartamentsType = {
  personId: number;
  token: string;
};

const getDepartaments = createAsyncThunk(
  'person/getDepartaments',
  async ({token, personId}: GetDepartamentsType, {rejectWithValue}) => {
    return await httpClient(token)
      .get(`/person/${personId}/departaments`)
      .then(res => res.data)
      .catch(rejectWithValue);
  },
);

const getPersonByNameOrNumber = createAsyncThunk(
  'person/getByNameOrNumber',
  async (
    {token, filter}: {token: string; filter: string},
    {rejectWithValue},
  ) => {
    return await httpClient(token)
      .get('/person/filter', {params: {text: filter}})
      .then(res => res.data)
      .catch(rejectWithValue);
  },
);

const PersonService = {
  requestCode,
  login,
  logout,
  getProfile,
  updateProfile,
  getDepartaments,
  getPersonByNameOrNumber,
};

export default PersonService;
