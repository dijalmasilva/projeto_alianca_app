import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChurchScreen from './index';
import ChurchDetailScreen from './details';

const ChurchStack = createNativeStackNavigator();

export enum ChurchRoutes {
  churchs = 'churchsList',
  details = 'churchDetails',
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
    </ChurchStack.Navigator>
  );
};

export default ChurchRootScreen;
