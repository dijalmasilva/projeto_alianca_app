import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChurchScreen from 'screens/authenticated/church/list';
import ChurchDetailScreen from './details';
import ChurchCreateScreen from './create';

const ChurchStack = createNativeStackNavigator();

export enum ChurchRoutes {
  churchs = 'churchsList',
  details = 'churchDetails',
  create = 'churchCreate',
}

const ChurchRootScreen = () => {
  return (
    <ChurchStack.Navigator initialRouteName="churchs">
      <ChurchStack.Screen
        name={ChurchRoutes.churchs}
        component={ChurchScreen}
        options={{title: 'Igrejas'}}
      />
      <ChurchStack.Screen
        name={ChurchRoutes.details}
        component={ChurchDetailScreen}
      />
      <ChurchStack.Screen
        name={ChurchRoutes.create}
        component={ChurchCreateScreen}
        options={{title: 'Nova Igreja'}}
      />
    </ChurchStack.Navigator>
  );
};

export default ChurchRootScreen;
