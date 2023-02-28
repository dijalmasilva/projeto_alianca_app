import {Person} from './Person';
import {Departament} from './Departament';
import {Church} from './Church';

export type Event = {
  id: string;
  name: string;
  description: string;
  startTime: string;
  finishTime: string;
  observations?: string;
  isWorship?: boolean;
  organizers: Person[];
  deacons: Person[];
  cooperators: Person[];
  pastors: Person[];
  levites: Person[];
  preacher?: Person;
  openWorship?: Person;
  offertory?: Person;
  departament?: Departament;
  church: Church;
};
