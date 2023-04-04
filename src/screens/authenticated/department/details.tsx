import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import ViewContainer from '@/components/container/ViewContainer';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Department, Role} from '@prisma/client';
import Input from '@/components/input/Input';
import UserInput from '@/components/input/UserInput';
import Button from '@/components/button/Button';
import useUpdateDepartment from '@/screens/authenticated/department/hooks/useUpdateDepartment';
import {useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import useRoleHook from '@/hooks/useRoleHook';

type RouteParams = {
  department: Department;
};

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
};
const DepartmentDetailScreen = ({route, navigation}: Props) => {
  const {canRender} = useRoleHook(useAppSelector(PersonSelectors.roles));
  const profile = useAppSelector(PersonSelectors.profile);
  const department = route.params
    ? (route.params as RouteParams).department
    : ({
        name: '',
        description: '',
        id: 0,
        leaderId: 0,
        churchId: 0,
      } as Department);

  const {
    onChangeName,
    onChangeDescription,
    onChangeLeader,
    onChangeMembers,
    onSubmit,
    departmentState,
  } = useUpdateDepartment(navigation, department);

  const isLeader = profile?.id === department.leaderId;
  const isAdminOrPastor = canRender([Role.PASTOR, Role.ADMIN]);

  return (
    <ScrollView>
      <ViewContainer style={styles.container}>
        <Input
          label="Nome do departamento"
          onChangeText={onChangeName}
          defaultValue={departmentState.name}
          editable={isLeader || isAdminOrPastor}
        />
        <Input
          label="Descrição"
          onChangeText={onChangeDescription}
          defaultValue={departmentState.description || ''}
          editable={isLeader || isAdminOrPastor}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        <UserInput
          onSingleSelect={onChangeLeader}
          label="Líder do departamento"
          defaultSingleValue={departmentState.leaderId}
          editable={isLeader || isAdminOrPastor}
        />
        <UserInput
          multipleSelection
          onMultiSelect={onChangeMembers}
          label="Membros do departamento"
          defaultMultiValue={departmentState.members || []}
          editable={isLeader || isAdminOrPastor}
        />
        {(isLeader || isAdminOrPastor) && (
          <Button style={styles.btUpdate} onPress={onSubmit}>
            <Text style={styles.textBt}>Atualizar</Text>
          </Button>
        )}
      </ViewContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  btUpdate: {
    marginTop: 16,
  },
  textBt: {
    textTransform: 'uppercase',
  },
});

export default DepartmentDetailScreen;
