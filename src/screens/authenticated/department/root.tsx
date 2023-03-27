import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DepartmentsScreen from './index';
import DepartmentDetailScreen from './details';

const DepartmentStack = createNativeStackNavigator();

export enum DepartmentRoutes {
  departments = 'departmentsList',
  details = 'departmentDetails',
}

const DepartmentRootScreen = () => {
  return (
    <DepartmentStack.Navigator initialRouteName={DepartmentRoutes.departments}>
      <DepartmentStack.Screen
        name={DepartmentRoutes.departments}
        component={DepartmentsScreen}
        options={{title: 'Departamentos'}}
      />
      <DepartmentStack.Screen
        name={DepartmentRoutes.details}
        component={DepartmentDetailScreen}
      />
    </DepartmentStack.Navigator>
  );
};

export default DepartmentRootScreen;
