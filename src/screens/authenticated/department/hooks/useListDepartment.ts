import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import DepartmentSelectors from 'store/features/department/selectors';
import useRoleHook from '@/hooks/useRoleHook';
import {useEffect, useState} from 'react';
import PersonService from 'store/features/person/person-service';
import {ROLE} from 'constants/roles.constants';
import DepartmentService from 'store/features/department/department-service';
import {DepartmentRoutes} from '@/screens/authenticated/department/root';
import {Department} from '@prisma/client';
import {NavigationProp} from '@react-navigation/native';

const useListDepartment = (navigation: NavigationProp<any>) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();
  const personLoading = useAppSelector(PersonSelectors.loading);
  const token = useAppSelector(PersonSelectors.accessToken);
  const profile = useAppSelector(PersonSelectors.profile);
  const departmentsOnImNotIncluded = useAppSelector(
    DepartmentSelectors.getDepartmentsOnUserLoggedWasNotIncluded,
  );
  const {departmentsAsLeader, departmentsAsMember} = profile;
  const roleHook = useRoleHook();

  const loadDepartments = async () => {
    await dispatch(PersonService.getDepartments({personId: profile.id, token}));
    if (roleHook.canRender([ROLE.ADMIN])) {
      await dispatch(
        DepartmentService.getDepartmentsImNotIncluded({
          token,
          personId: profile.id,
        }),
      );
    }
  };

  useEffect(() => {
    loadDepartments().finally(() => setRefreshing(false));
  }, []);

  const createDepartment = () => {
    navigation.navigate(DepartmentRoutes.create);
  };

  const seeDetails = (department: Department) => {
    navigation.navigate(DepartmentRoutes.details, {department: department});
  };

  return {
    personLoading,
    departmentsAsLeader,
    departmentsAsMember,
    departmentsOnImNotIncluded,
    createDepartment,
    seeDetails,
    loadDepartments,
    refreshing,
    setRefreshing,
  };
};

export default useListDepartment;
