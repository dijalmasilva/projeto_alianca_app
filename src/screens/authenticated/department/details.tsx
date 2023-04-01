import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import ViewContainer from '@/components/container/ViewContainer';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Department} from '@prisma/client';
import Input from '@/components/input/Input';
import UserInput from '@/components/input/UserInput';
import Button from '@/components/button/Button';
import useUpdateDepartment from '@/screens/authenticated/department/hooks/useUpdateDepartment';

type RouteParams = {
  department: Department;
};

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
};
const DepartmentDetailScreen = ({route, navigation}: Props) => {
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

  return (
    <ScrollView>
      <ViewContainer style={styles.container}>
        <Input
          label="Nome do departamento"
          onChangeText={onChangeName}
          defaultValue={departmentState.name}
        />
        <Input
          label="Descrição"
          onChangeText={onChangeDescription}
          defaultValue={departmentState.description || ''}
        />
        <UserInput
          onSingleSelect={onChangeLeader}
          label="Líder do departamento"
          defaultSingleValue={departmentState.leaderId}
        />
        <UserInput
          multipleSelection
          onMultiSelect={onChangeMembers}
          label="Membros do departamento"
          defaultMultiValue={departmentState.members || []}
        />
        <Button style={styles.btUpdate} onPress={onSubmit}>
          <Text style={styles.textBt}>Atualizar</Text>
        </Button>
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
