import {Department} from '@prisma/client';

type DepartmentUpdateDto = Omit<Department, 'id' | 'createdAt'> & {
  members?: number[];
};

export default DepartmentUpdateDto;
