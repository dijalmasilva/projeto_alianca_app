import {ROLE} from 'constants/roles.constants';

export type Person = {
  id: string;
  name: string;
  picture?: string;
  birthday: string;
  hasAlliance?: boolean;
  phoneNumber: string;
  roles: ROLE[];
};
