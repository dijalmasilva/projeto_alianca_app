import {Event} from '@prisma/client';

type EventCreateDto = Omit<Event, 'id' | 'createdAt'>;

export default EventCreateDto;
