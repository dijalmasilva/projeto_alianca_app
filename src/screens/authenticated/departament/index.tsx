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
import Loading from '@/components/loading/loading';
import {NavigationProp} from '@react-navigation/native';
import {DepartamentRoutes} from '@/screens/authenticated/departament/root';
import DepartamentList from '@/components/departament-list/DepartamentList';
import {Departament} from '@prisma/client';
import useRoleHook from '@/hooks/useRoleHook';
import DepartamentService from 'store/features/departament/departament-service';
import DepartamentSelectors from 'store/features/departament/selectors';

type Props = {
  navigation: NavigationProp<any>;
};

const DepartamentsScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const personLoading = useAppSelector(PersonSelectors.loading);
  const token = useAppSelector(PersonSelectors.accessToken);
  const profile = useAppSelector(PersonSelectors.profile);
  const departamentsOnImNotIncluded = useAppSelector(
    DepartamentSelectors.getDepartamentsOnUserLoggedWasNotIncluded,
  );
  const {departamentsAsLeader, departamentsAsMember} = profile;
  const roleHook = useRoleHook();

  useEffect(() => {
    dispatch(PersonService.getDepartaments({personId: profile.id, token}));
    if (roleHook.canRender([ROLE.ADMIN])) {
      dispatch(
        DepartamentService.getDepartamentsImNotIncluded({
          token,
          personId: profile.id,
        }),
      );
    }
  }, []);

  const createDepartament = () => {
    navigation.navigate(DepartamentRoutes.details);
  };

  const seeDetails = (department: Departament) => {
    navigation.navigate(DepartamentRoutes.details, {departament: department});
  };

  if (personLoading) {
    return <Loading />;
  }

  return (
    <ViewContainer style={styles.mainContainer}>
      <RoleView accepteds={[ROLE.ADMIN]}>
        <FlatButton onPress={createDepartament}>
          <Icon name="plus" size={25} />
        </FlatButton>
      </RoleView>
      <Text>Departamentos como líder</Text>
      <DepartamentList
        departaments={departamentsAsLeader}
        onSelect={seeDetails}
      />
      <Text>Departamentos como membro</Text>
      <DepartamentList
        departaments={departamentsAsMember}
        onSelect={seeDetails}
      />
      <RoleView accepteds={[ROLE.ADMIN]}>
        <Text>Outros departamentos</Text>
        <Text style={styles.span}>
          Visualização apenas para administradores
        </Text>
        <DepartamentList
          departaments={departamentsOnImNotIncluded}
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

export default DepartamentsScreen;
