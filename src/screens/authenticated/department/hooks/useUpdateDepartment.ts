import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import {useEffect, useState} from 'react';
import {Department, Prisma} from '@prisma/client';
import DepartmentService from 'store/features/department/department-service';
import {Alert} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

const useUpdateDepartment = (
  navigation: NavigationProp<any>,
  department: Department,
) => {
  useEffect(() => {
    navigation.setOptions({title: department.name});
  }, [department]);

  const dispatch = useAppDispatch();
  const token = useAppSelector(PersonSelectors.accessToken);
  const [departmentState, setDepartmentState] =
    useState<Prisma.DepartmentCreateInput>({
      name: department.name,
      description: department.description,
      leader: {
        connect: {
          id: department.leaderId,
        },
      },
      church: {
        connect: {
          id: department.churchId,
        },
      },
    });

  const [members, setMembers] = useState<number[]>([]);
  const onChangeDepartment = (key: string, text: string) => {
    setDepartmentState(prevState => ({...prevState, [key]: text}));
  };

  const onChangeName = (text: string) => onChangeDepartment('name', text);
  const onChangeDescription = (text: string) =>
    onChangeDepartment('description', text);

  const onChangeLeader = (leaderId: number) => {
    setDepartmentState(prevState => ({
      ...prevState,
      leader: {
        connect: {
          id: leaderId,
        },
      },
    }));
  };

  const onChangeMembers = (newMembers: number[]) => {
    setMembers(newMembers);
  };

  const onSubmit = async () => {
    const departmentUpdate = {
      ...departmentState,
      members: {
        connectOrCreate: members.map(member => ({
          create: {
            memberId: member,
          },
          where: {
            memberId_departmentId: {
              departmentId: (department as Department).id,
              memberId: member,
            },
          },
        })),
      },
    };

    const resultUpdate = await dispatch(
      DepartmentService.updateDepartment({
        token,
        departmentId: department.id,
        department: departmentUpdate,
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
  };
};

export default useUpdateDepartment;
