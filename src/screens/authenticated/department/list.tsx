import React, {useEffect} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import ViewContainer from '@/components/container/ViewContainer';
import RoleView from '@/components/role-view/RoleView';
import {NavigationProp} from '@react-navigation/native';
import DepartmentList from '@/components/department-list/DepartmentList';
import NotchLoading from '@/components/loading/notch-loading';
import useListDepartment from '@/screens/authenticated/department/hooks/useListDepartment';
import HeaderButton from '@/components/button/HeaderButton';
import useRoleHook from '@/hooks/useRoleHook';
import {useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import {Role} from '@prisma/client';

type Props = {
  navigation: NavigationProp<any>;
};

const _headerRight = (onPress: () => void) => () =>
  <HeaderButton onPress={onPress} />;

const DepartmentsScreen = ({navigation}: Props) => {
  const {canRender} = useRoleHook(useAppSelector(PersonSelectors.roles));
  const {
    departmentsAsLeader,
    departmentsAsMember,
    createDepartment,
    departmentsOnImNotIncluded,
    seeDetails,
    personLoading,
    refreshing,
    loadDepartments,
    setRefreshing,
  } = useListDepartment(navigation);

  useEffect(() => {
    if (canRender([Role.ADMIN, Role.PASTOR])) {
      navigation.setOptions({
        headerRight: _headerRight(createDepartment),
      });
    }
  }, []);

  if (personLoading) {
    return (
      <ViewContainer center>
        <NotchLoading size={50} />
      </ViewContainer>
    );
  }

  return (
    <ScrollView
      style={styles.scrollContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            loadDepartments().finally(() => setRefreshing(false));
          }}
        />
      }>
      <View style={styles.mainContainer}>
        <Text>Departamentos como líder</Text>
        <DepartmentList
          departments={departmentsAsLeader}
          onSelect={seeDetails}
        />
        <Text>Departamentos como membro</Text>
        <DepartmentList
          departments={departmentsAsMember}
          onSelect={seeDetails}
        />
        <RoleView accepteds={[Role.ADMIN]}>
          <Text>Outros departamentos</Text>
          <Text style={styles.span}>
            Visualização apenas para administradores
          </Text>
          <DepartmentList
            departments={departmentsOnImNotIncluded}
            onSelect={seeDetails}
          />
        </RoleView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  mainContainer: {
    gap: 4,
    height: '100%',
    flex: 1,
    padding: 16,
  },
  span: {
    fontSize: 11,
  },
});

export default DepartmentsScreen;
