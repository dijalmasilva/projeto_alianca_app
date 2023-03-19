import {RootState} from 'store/index';
import {PersonProfile} from './person';

export const loading = (state: RootState): boolean => state.person.loading;

export const accessToken = (state: RootState): string =>
  state.person.auth.accessToken || '';

export const profile = (state: RootState): PersonProfile => state.person.me;

export const auth = (state: RootState) => state.person.auth;

export const roles = (state: RootState) => state.person.me.roles;

const PersonSelectors = {
  loading,
  accessToken,
  profile,
  auth,
  roles,
};

export default PersonSelectors;
