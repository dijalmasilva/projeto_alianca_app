import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
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

type Props = {
  navigation: NavigationProp<any>;
};

const DepartamentsScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const personLoading = useAppSelector(PersonSelectors.loading);
  const token = useAppSelector(PersonSelectors.accessToken);
  const profile = useAppSelector(PersonSelectors.profile);
  const {departamentsAsLeader, departamentsAsMember} = profile;

  useEffect(() => {
    dispatch(PersonService.getDepartaments({personId: profile.id, token}));
  }, []);

  const createDepartament = () => {
    navigation.navigate(DepartamentRoutes.details);
  };

  if (personLoading) {
    return <Loading />;
  }

  return (
    <ViewContainer>
      <RoleView accepteds={[ROLE.ADMIN]}>
        <FlatButton onPress={createDepartament}>
          <Icon name="plus" size={25} />
        </FlatButton>
      </RoleView>
      <Text>Departamentos como líder</Text>
      {departamentsAsLeader.map(d => (
        <View key={d.id}>
          <Text>{d.name}</Text>
        </View>
      ))}
      <Text>Departamentos como membro</Text>
      {departamentsAsMember.map(d => (
        <View key={d.id}>
          <Text>{d.name}</Text>
        </View>
      ))}
    </ViewContainer>
  );
};

export default DepartamentsScreen;
