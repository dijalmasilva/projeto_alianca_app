import {ROLE} from 'constants/roles.constants';
import {Church} from './Church';

export type Person = {
  id: string;
  name: string;
  picture?: string;
  birthday: string;
  hasAlliance?: boolean;
  phoneNumber: string;
  roles: ROLE[];
  churchs: Church[];
};
