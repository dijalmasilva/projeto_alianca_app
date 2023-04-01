import {Department} from '@prisma/client';

type DepartmentCreateDto = Omit<Department, 'id' | 'createdAt'> & {
  members: number[];
};

export default DepartmentCreateDto;
