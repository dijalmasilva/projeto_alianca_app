import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DepartmentsScreen from 'screens/authenticated/department/list';
import DepartmentDetailScreen from './details';
import DepartmentCreateScreen from '@/screens/authenticated/department/create';

const DepartmentStack = createNativeStackNavigator();

export enum DepartmentRoutes {
  departments = 'departmentsList',
  details = 'departmentDetails',
  create = 'createDetails',
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
      <DepartmentStack.Screen
        name={DepartmentRoutes.create}
        component={DepartmentCreateScreen}
        options={{title: 'Novo Departamento'}}
      />
    </DepartmentStack.Navigator>
  );
};

export default DepartmentRootScreen;
