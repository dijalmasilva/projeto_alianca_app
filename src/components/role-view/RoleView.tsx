import React, {ReactNode} from 'react';
import useRoleHook from '@/hooks/useRoleHook';
import {ROLE} from 'constants/roles.constants';

type RoleViewProps = {
  accepteds: ROLE[];
  children: ReactNode;
};

const RoleView = ({accepteds, children}: RoleViewProps) => {
  const {canRender} = useRoleHook();

  if (canRender(accepteds)) {
    return <>{children}</>;
  }

  return <></>;
};

export default RoleView;
