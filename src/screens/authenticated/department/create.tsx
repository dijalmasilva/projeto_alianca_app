import React from 'react';
import {ScrollView, Text} from 'react-native';
import ViewContainer from '@/components/container/ViewContainer';
import {NavigationProp} from '@react-navigation/native';
import Input from '@/components/input/Input';
import UserInput from '@/components/input/UserInput';
import Button from '@/components/button/Button';
import useCreateDepartment from '@/screens/authenticated/department/hooks/useCreateDepartment';

type Props = {
  navigation: NavigationProp<any>;
};
const DepartmentCreateScreen = ({navigation}: Props) => {
  const {
    onChangeMembers,
    onChangeDescription,
    onChangeLeader,
    departmentState,
    onChangeName,
    onSubmit,
  } = useCreateDepartment(navigation);

  return (
    <ScrollView>
      <ViewContainer style={{gap: 8}}>
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
          editable
        />
        <UserInput
          multipleSelection
          onMultiSelect={onChangeMembers}
          label="Membros do departamento"
          editable
        />
        <Button onPress={onSubmit}>
          <Text>CADASTRAR</Text>
        </Button>
      </ViewContainer>
    </ScrollView>
  );
};

export default DepartmentCreateScreen;
