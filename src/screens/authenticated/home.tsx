import React from 'react';
import CalendarScreen from '@/screens/authenticated/calendar';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '@/screens/authenticated/profile';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';

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

const HomeScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Calendar"
      screenOptions={{
        tabBarLabelStyle: {
          paddingBottom: Platform.OS === 'ios' ? 0 : 5,
        },
        tabBarIconStyle: {
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: 'Eventos',
          tabBarIcon: IconCalendar,
        }}
      />
      <Tab.Screen
        name="Departaments"
        component={CalendarScreen}
        options={{title: 'Departamentos', tabBarIcon: IconDepartament}}
      />
      <Tab.Screen
        name="Churchs"
        component={CalendarScreen}
        options={{title: 'Igrejas', tabBarIcon: IconChurch}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: 'Perfil', tabBarIcon: IconProfile}}
      />
    </Tab.Navigator>
  );
};
export default HomeScreen;
