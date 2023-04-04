import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '@/screens/authenticated/profile';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
import useRoleHook from '@/hooks/useRoleHook';
import ChurchRootScreen from '@/screens/authenticated/church/root';
import DepartmentRootScreen from '@/screens/authenticated/department/root';
import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import PersonService from 'store/features/person/person-service';
import BibleScreen from '@/screens/authenticated/bible';
import EventRootScreen from '@/screens/authenticated/events/root';
import {Role} from '@prisma/client';

const Tab = createBottomTabNavigator();

type IconTabType = {size: number; color: string};

const IconCalendar = ({size, color}: IconTabType) => {
  return <AntDesignIcon name="calendar" size={size} color={color} />;
};

const IconDepartment = ({size, color}: IconTabType) => {
  return <FontAwesome5Icon name="house-user" size={size} color={color} />;
};

const IconChurch = ({size, color}: IconTabType) => {
  return <FontAwesome5Icon name="church" size={size} color={color} />;
};

const IconProfile = ({size, color}: IconTabType) => {
  return <IonIcon name="person" size={size} color={color} />;
};

const IconBible = ({size, color}: IconTabType) => {
  return <FontAwesome5Icon name="bible" size={size} color={color} />;
};

export enum AuthenticatedRoutes {
  agenda = 'agenda',
  departments = 'departments',
  churchs = 'churchs',
  profile = 'profile',
  bible = 'bible',
}

const AuthenticatedRootScreen = () => {
  const {canRender} = useRoleHook(useAppSelector(PersonSelectors.roles));
  const dispatch = useAppDispatch();
  const token = useAppSelector(PersonSelectors.accessToken);
  const profile = useAppSelector(PersonSelectors.profile);

  useEffect(() => {
    if (!profile.id) {
      dispatch(PersonService.getProfile(token));
    }
  }, [profile]);

  return (
    <Tab.Navigator
      initialRouteName={AuthenticatedRoutes.agenda}
      screenOptions={{
        tabBarLabelStyle: {
          paddingBottom: Platform.OS === 'ios' ? 0 : 5,
        },
        tabBarIconStyle: {
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name={AuthenticatedRoutes.agenda}
        component={EventRootScreen}
        options={{
          title: 'Eventos',
          headerShown: false,
          tabBarIcon: IconCalendar,
        }}
      />
      {canRender([
        Role.ADMIN,
        Role.PASTOR,
        Role.LEVITA,
        Role.DIACONO,
        Role.LIDER,
        Role.COOPERADOR,
      ]) && (
        <Tab.Screen
          name={AuthenticatedRoutes.departments}
          component={DepartmentRootScreen}
          options={{
            title: 'Departamentos',
            tabBarIcon: IconDepartment,
            headerShown: false,
          }}
        />
      )}
      {canRender([Role.ADMIN, Role.PASTOR]) && (
        <Tab.Screen
          name={AuthenticatedRoutes.churchs}
          component={ChurchRootScreen}
          options={{
            tabBarIcon: IconChurch,
            headerShown: false,
            title: 'Igrejas',
          }}
        />
      )}
      <Tab.Screen
        name={AuthenticatedRoutes.profile}
        component={ProfileScreen}
        options={{title: 'Perfil', tabBarIcon: IconProfile}}
      />
      <Tab.Screen
        name={AuthenticatedRoutes.bible}
        component={BibleScreen}
        options={{title: 'Bíblia', tabBarIcon: IconBible}}
      />
    </Tab.Navigator>
  );
};
export default AuthenticatedRootScreen;
