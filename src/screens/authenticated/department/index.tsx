import React, {useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import PersonService from 'store/features/person/person-service';
import ViewContainer from '@/components/container/ViewContainer';
import FlatButton from '@/components/button/FlatButton';
import RoleView from '@/components/role-view/RoleView';
import {ROLE} from 'constants/roles.constants';
import Icon from 'react-native-vector-icons/AntDesign';
import {NavigationProp} from '@react-navigation/native';
import {DepartmentRoutes} from '@/screens/authenticated/department/root';
import DepartmentList from '@/components/department-list/DepartmentList';
import {Department} from '@prisma/client';
import useRoleHook from '@/hooks/useRoleHook';
import DepartmentService from 'store/features/department/department-service';
import DepartmentSelectors from 'store/features/department/selectors';
import NotchLoading from '@/components/loading/notch-loading';

type Props = {
  navigation: NavigationProp<any>;
};

const DepartmentsScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const personLoading = useAppSelector(PersonSelectors.loading);
  const token = useAppSelector(PersonSelectors.accessToken);
  const profile = useAppSelector(PersonSelectors.profile);
  const departmentsOnImNotIncluded = useAppSelector(
    DepartmentSelectors.getDepartmentsOnUserLoggedWasNotIncluded,
  );
  const {departmentsAsLeader, departmentsAsMember} = profile;
  const roleHook = useRoleHook();

  useEffect(() => {
    dispatch(PersonService.getDepartments({personId: profile.id, token}));
    if (roleHook.canRender([ROLE.ADMIN])) {
      dispatch(
        DepartmentService.getDepartmentsImNotIncluded({
          token,
          personId: profile.id,
        }),
      );
    }
  }, []);

  const createDepartment = () => {
    navigation.navigate(DepartmentRoutes.details);
  };

  const seeDetails = (department: Department) => {
    navigation.navigate(DepartmentRoutes.details, {department: department});
  };

  if (personLoading) {
    return (
      <ViewContainer center>
        <NotchLoading size={50} />
      </ViewContainer>
    );
  }

  return (
    <ViewContainer style={styles.mainContainer}>
      <RoleView accepteds={[ROLE.ADMIN]}>
        <FlatButton onPress={createDepartment}>
          <Icon name="plus" size={25} />
        </FlatButton>
      </RoleView>
      <Text>Departamentos como líder</Text>
      <DepartmentList departments={departmentsAsLeader} onSelect={seeDetails} />
      <Text>Departamentos como membro</Text>
      <DepartmentList departments={departmentsAsMember} onSelect={seeDetails} />
      <RoleView accepteds={[ROLE.ADMIN]}>
        <Text>Outros departamentos</Text>
        <Text style={styles.span}>
          Visualização apenas para administradores
        </Text>
        <DepartmentList
          departments={departmentsOnImNotIncluded}
          onSelect={seeDetails}
        />
      </RoleView>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    gap: 4,
  },
  span: {
    fontSize: 11,
  },
});

export default DepartmentsScreen;
