import {ROLE} from 'constants/roles.constants';
import {useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';

const useRoleHook = () => {
  const roles = useAppSelector(PersonSelectors.roles);

  return {
    canRender: (accepteds: ROLE[]): boolean => {
      return !!accepteds.find(a => roles.includes(a));
    },
  };
};

export default useRoleHook;
