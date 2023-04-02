import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import {useEffect, useState} from 'react';
import DepartmentService from 'store/features/department/department-service';
import {Alert} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {Department} from '@prisma/client';
import DepartmentUpdateDto from 'models/department/department-update.dto';
import {DepartmentActions} from 'store/features/department/department';

const useUpdateDepartment = (
  navigation: NavigationProp<any>,
  department: Department,
) => {
  useEffect(() => {
    navigation.setOptions({title: department.name});
  }, [department]);

  const dispatch = useAppDispatch();
  const token = useAppSelector(PersonSelectors.accessToken);
  const [departmentState, setDepartmentState] = useState<DepartmentUpdateDto>({
    name: department.name,
    description: department.description,
    leaderId: department.leaderId,
    churchId: department.churchId,
    members: [],
  });

  useEffect(() => {
    (async () => {
      console.log('get members id from department: ', department.id);
      await dispatch(DepartmentActions.setLoading(true));
      const membersIdResult = await dispatch(
        DepartmentService.getMembersIdFromDepartment({
          token,
          departmentId: department.id,
        }),
      );

      if (
        DepartmentService.getMembersIdFromDepartment.fulfilled.match(
          membersIdResult,
        )
      ) {
        console.log('membersIdResult: ', membersIdResult.payload);
        onChangeMembers(membersIdResult.payload);
      } else {
        Alert.alert(
          'Ocorreu um erro ao tentar carregar os membros do departamento.',
        );
      }
      dispatch(DepartmentActions.setLoading(false));
    })();
  }, [department]);

  const onChangeDepartment = (key: string, value: any) => {
    setDepartmentState(prevState => ({...prevState, [key]: value}));
  };

  const onChangeName = (text: string) => onChangeDepartment('name', text);
  const onChangeDescription = (text: string) =>
    onChangeDepartment('description', text);

  const onChangeLeader = (leaderId: number) =>
    onChangeDepartment('leaderId', leaderId);

  const onChangeMembers = (newMembers: number[]) => {
    console.log('newMembers: ', newMembers);
    onChangeDepartment('members', newMembers);
  };

  const onSubmit = async () => {
    const resultUpdate = await dispatch(
      DepartmentService.updateDepartment({
        token,
        departmentId: department.id,
        department: departmentState,
      }),
    );

    if (DepartmentService.updateDepartment.fulfilled.match(resultUpdate)) {
      navigation.goBack();
    } else {
      Alert.alert('Ocorreu um erro ao tentar atualizar esse departamento.');
    }
  };

  return {
    onChangeName,
    onChangeDescription,
    onChangeLeader,
    onChangeMembers,
    onSubmit,
    departmentState,
  };
};

export default useUpdateDepartment;
