import {Role} from '@prisma/client';
import {useCallback} from 'react';

const useRoleHook = (roles: Role[]) => {
  const canRender = useCallback(
    (accepteds: Role[]): boolean => {
      return !!accepteds.find(a => roles.includes(a));
    },
    [roles],
  );

  return {
    canRender,
  };
};

export default useRoleHook;
