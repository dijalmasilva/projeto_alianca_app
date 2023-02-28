import {Person} from './Person';
import {Church} from './Church';

export type Departament = {
  id: string;
  name: string;
  leader: Person;
  description?: string;
  members: Person[];
  church: Church;
};
