import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, Text} from 'react-native';
import ViewContainer from '@/components/container/ViewContainer';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Department, Prisma} from '@prisma/client';
import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import DepartmentService from 'store/features/department/department-service';
import PersonSelectors from 'store/features/person/selectors';
import Input from '@/components/input/Input';
import UserInput from '@/components/input/UserInput';
import Button from '@/components/button/Button';

type RouteParams = {
  department: Department;
};

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
};
const DepartmentDetailScreen = ({route, navigation}: Props) => {
  console.log('route');
  console.log(route);
  const dispatch = useAppDispatch();
  const token = useAppSelector(PersonSelectors.accessToken);
  const department = route.params
    ? (route.params as RouteParams).department
    : undefined;

  const isNewDepartment = !department;

  const [departmentState, setDepartmentState] = useState<
    Department | Prisma.DepartmentCreateInput | undefined
  >(undefined);
  const [members, setMembers] = useState<number[]>([]);

  useEffect(() => {
    navigation.setOptions({
      title: department ? department.name : 'Novo departamento',
    });
    setDepartmentState(department);
  }, [department]);

  const onChangeDepartment = (key: string, text: string) => {
    setDepartmentState(
      prevState =>
        ({...prevState, [key]: text} as Prisma.DepartmentCreateInput),
    );
  };

  const onChangeName = (text: string) => onChangeDepartment('name', text);
  const onChangeDescription = (text: string) =>
    onChangeDepartment('description', text);

  const onChangeLeader = (leaderId: number) => {
    setDepartmentState(
      prevState =>
        ({
          ...prevState,
          leader: {
            connect: {
              id: leaderId,
            },
          },
        } as Prisma.DepartmentCreateInput),
    );
  };

  const onChangeMembers = (newMembers: number[]) => {
    setMembers(newMembers);
  };

  const onSubmit = async () => {
    if (isNewDepartment) {
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
          DepartmentService.updateDepartment.fulfilled.match(
            updateWithMembers,
          )
        ) {
          navigation.goBack();
        } else {
          Alert.alert(
            'Houve um erro ao inserir os membros desse departamento.',
          );
        }
      } else {
        Alert.alert('Houve um erro ao cadastrar o departamento');
      }
    } else {
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
      } as Prisma.DepartmentUpdateInput;

      const resultUpdate = await dispatch(
        DepartmentService.updateDepartment({
          token,
          departmentId: (department as Department).id,
          department: departmentUpdate,
        }),
      );

      if (DepartmentService.updateDepartment.fulfilled.match(resultUpdate)) {
        navigation.goBack();
      } else {
        Alert.alert('Ocorreu um erro ao tentar atualizar esse departamento.');
      }
    }
  };

  return (
    <ScrollView>
      <ViewContainer style={{gap: 8}}>
        <Input
          label="Nome do departamento"
          onChangeText={onChangeName}
          defaultValue={departmentState?.name}
        />
        <Input
          label="Descrição"
          onChangeText={onChangeDescription}
          defaultValue={departmentState?.description || ''}
        />
        <UserInput
          onSingleSelect={onChangeLeader}
          label="Líder do departamento"
          defaultSingleValue={(departmentState as Department)?.leaderId}
        />
        <UserInput
          multipleSelection
          onMultiSelect={onChangeMembers}
          label="Membros do departamento"
        />
        <Button onPress={onSubmit}>
          <Text>CADASTRAR</Text>
        </Button>
      </ViewContainer>
    </ScrollView>
  );
};

export default DepartmentDetailScreen;
