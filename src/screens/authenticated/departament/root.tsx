import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DepartamentsScreen from './index';
import DepartamentDetailScreen from './details';

const DepartamentStack = createNativeStackNavigator();

export enum DepartamentRoutes {
  departaments = 'departamentsList',
  details = 'departamentDetails',
}

const DepartamentRootScreen = () => {
  return (
    <DepartamentStack.Navigator
      initialRouteName={DepartamentRoutes.departaments}>
      <DepartamentStack.Screen
        name={DepartamentRoutes.departaments}
        component={DepartamentsScreen}
        options={{title: 'Departamentos'}}
      />
      <DepartamentStack.Screen
        name={DepartamentRoutes.details}
        component={DepartamentDetailScreen}
      />
    </DepartamentStack.Navigator>
  );
};

export default DepartamentRootScreen;
