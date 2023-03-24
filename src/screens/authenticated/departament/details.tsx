import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, Text} from 'react-native';
import ViewContainer from '@/components/container/ViewContainer';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Departament, Prisma} from '@prisma/client';
import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import DepartamentService from 'store/features/departament/departament-service';
import PersonSelectors from 'store/features/person/selectors';
import {DepartamentRoutes} from '@/screens/authenticated/departament/root';
import Input from '@/components/input/Input';
import UserInput from '@/components/input/UserInput';
import Button from '@/components/button/Button';

type RouteParams = {
  departament: Departament;
};

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
};
const DepartamentDetailScreen = ({route, navigation}: Props) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(PersonSelectors.accessToken);
  const departament = route.params
    ? (route.params as RouteParams).departament
    : undefined;

  const isNewDepartament = !departament;

  const [departamentState, setDepartamentState] = useState<
    Departament | Prisma.DepartamentCreateInput | undefined
  >(undefined);

  useEffect(() => {
    navigation.setOptions({
      title: departament ? departament.name : 'Novo departamento',
    });
    setDepartamentState(departament);
  }, [departament]);

  const onChangeDepartament = (key: string, text: string) => {
    setDepartamentState(
      prevState =>
        ({...prevState, [key]: text} as Prisma.DepartamentCreateInput),
    );
  };

  const onChangeName = (text: string) => onChangeDepartament('name', text);
  const onChangeDescription = (text: string) =>
    onChangeDepartament('description', text);

  const onChangeLeader = (leaderId: number) => {
    setDepartamentState(
      prevState =>
        ({
          ...prevState,
          leader: {
            connect: {
              id: leaderId,
            },
          },
        } as Prisma.DepartamentCreateInput),
    );
  };

  const onChangeMembers = (members: number[]) => {
    const membersResult = members.map(memberId => ({
      create: {
        memberId: memberId,
      },
      where: {
        memberId_departamentId: {
          memberId: memberId,
        },
      },
    }));

    setDepartamentState(
      prevState =>
        ({
          ...prevState,
          members: {
            connectOrCreate: membersResult,
          },
        } as Prisma.DepartamentCreateInput),
    );
  };

  const onSubmit = async () => {
    if (isNewDepartament) {
      const resultCreate = await dispatch(
        DepartamentService.createDepartament({
          token,
          departament: {
            ...(departamentState as Prisma.DepartamentCreateInput),
            church: {
              connect: {
                id: 1,
              },
            },
          },
        }),
      );

      if (DepartamentService.createDepartament.fulfilled.match(resultCreate)) {
        navigation.goBack();
      } else {
        console.log('erro');
        console.log(resultCreate.payload);
        Alert.alert('Houve um erro ao cadastrar o departamento');
      }
    } else {
      const departamentUpdate = {
        ...departamentState,
      } as Prisma.DepartamentUpdateInput;

      const resultUpdate = await dispatch(
        DepartamentService.updateDepartament({
          token,
          departamentId: (departament as Departament).id,
          departament: departamentUpdate,
        }),
      );

      if (DepartamentService.updateDepartament.fulfilled.match(resultUpdate)) {
        navigation.goBack();
      } else {
        Alert.alert('Ocorreu um erro ao tentar atualizar esse departamento.');
      }
    }
  };

  return (
    <ScrollView>
      <ViewContainer>
        <Input label="Nome do departamento" onChangeText={onChangeName} />
        <Input label="Descrição" onChangeText={onChangeDescription} />
        <UserInput
          onSingleSelect={onChangeLeader}
          label="Líder do departamento"
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

export default DepartamentDetailScreen;
