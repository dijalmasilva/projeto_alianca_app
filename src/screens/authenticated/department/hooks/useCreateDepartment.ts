import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import {useState} from 'react';
import {Department, Prisma} from '@prisma/client';
import DepartmentService from 'store/features/department/department-service';
import {Alert} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

const useCreateDepartment = (navigation: NavigationProp<any>) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(PersonSelectors.accessToken);
  const [departmentState, setDepartmentState] =
    useState<Prisma.DepartmentCreateInput>({
      name: '',
      description: '',
      leader: {},
      church: {
        connect: {
          id: 1,
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
    const resultCreate = await dispatch(
      DepartmentService.createDepartment({
        token,
        department: {
          ...(departmentState as Prisma.DepartmentCreateInput),
          church: {
            connect: {
              id: 1,
            },
          },
        },
      }),
    );

    if (DepartmentService.createDepartment.fulfilled.match(resultCreate)) {
      const departmentCreated = resultCreate.payload as Department;
      const departmentUpdate = {
        ...departmentCreated,
        members: {
          connectOrCreate: members.map(member => ({
            create: {
              memberId: member,
            },
            where: {
              memberId_departmentId: {
                departmentId: departmentCreated.id,
                memberId: member,
              },
            },
          })),
        },
      } as Prisma.DepartmentUpdateInput;
      const updateWithMembers = await dispatch(
        DepartmentService.updateDepartment({
          token,
          departmentId: departmentCreated.id,
          department: departmentUpdate,
        }),
      );
      if (
        DepartmentService.updateDepartment.fulfilled.match(updateWithMembers)
      ) {
        navigation.goBack();
      } else {
        Alert.alert('Houve um erro ao inserir os membros desse departamento.');
      }
    } else {
      Alert.alert('Houve um erro ao cadastrar o departamento');
    }
  };

  return {
    departmentState,
    onChangeName,
    onChangeDescription,
    onChangeLeader,
    onChangeMembers,
    onSubmit,
  };
};

export default useCreateDepartment;
