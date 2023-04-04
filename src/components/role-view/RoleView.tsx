import React, {ReactNode} from 'react';
import useRoleHook from '@/hooks/useRoleHook';
import {useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import {Role} from '@prisma/client';

type RoleViewProps = {
  accepteds: Role[];
  children: ReactNode;
};

const RoleView = ({accepteds, children}: RoleViewProps) => {
  const {canRender} = useRoleHook(useAppSelector(PersonSelectors.roles));

  if (canRender(accepteds)) {
    return <>{children}</>;
  }

  return <></>;
};

export default RoleView;
