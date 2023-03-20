import React from 'react';
import AgendaScreen from '@/screens/authenticated/agenda';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '@/screens/authenticated/profile';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
import {ROLE} from 'constants/roles.constants';
import useRoleHook from '@/hooks/useRoleHook';
import ChurchRootScreen from '@/screens/authenticated/church/root';

const Tab = createBottomTabNavigator();

type IconTabType = {size: number; color: string};

const IconCalendar = ({size, color}: IconTabType) => {
  return <AntDesignIcon name="calendar" size={size} color={color} />;
};

const IconDepartament = ({size, color}: IconTabType) => {
  return <FontAwesome5Icon name="house-user" size={size} color={color} />;
};

const IconChurch = ({size, color}: IconTabType) => {
  return <FontAwesome5Icon name="church" size={size} color={color} />;
};

const IconProfile = ({size, color}: IconTabType) => {
  return <IonIcon name="person" size={size} color={color} />;
};

export enum TabRoutes {
  calendar = 'calendar',
  departaments = 'departaments',
  churchs = 'churchs',
  profile = 'profile',
}

const HomeScreen = () => {
  const {canRender} = useRoleHook();

  return (
    <Tab.Navigator
      initialRouteName={TabRoutes.calendar}
      screenOptions={{
        tabBarLabelStyle: {
          paddingBottom: Platform.OS === 'ios' ? 0 : 5,
        },
        tabBarIconStyle: {
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name={TabRoutes.calendar}
        component={AgendaScreen}
        options={{
          title: 'Eventos',
          tabBarIcon: IconCalendar,
        }}
      />
      <Tab.Screen
        name={TabRoutes.departaments}
        component={AgendaScreen}
        options={{title: 'Departamentos', tabBarIcon: IconDepartament}}
      />
      {canRender([ROLE.ADMIN, ROLE.PASTOR]) && (
        <Tab.Screen
          name={TabRoutes.churchs}
          component={ChurchRootScreen}
          options={{
            tabBarIcon: IconChurch,
            headerShown: false,
            title: 'Igrejas',
          }}
        />
      )}
      <Tab.Screen
        name={TabRoutes.profile}
        component={ProfileScreen}
        options={{title: 'Perfil', tabBarIcon: IconProfile}}
      />
    </Tab.Navigator>
  );
};
export default HomeScreen;
