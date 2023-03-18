import {RootState} from 'store/index';
import {PersonProfile} from './person';

export const loading = (state: RootState): boolean => state.person.loading;

export const accessToken = (state: RootState): string =>
  state.person.auth.accessToken || '';

export const profile = (state: RootState): PersonProfile => state.person.me;

export const auth = (state: RootState) => state.person.auth;

const PersonSelectors = {
  loading,
  accessToken,
  profile,
  auth,
};

export default PersonSelectors;
