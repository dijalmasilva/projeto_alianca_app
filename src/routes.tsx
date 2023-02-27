import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '@/screens/login';
import HomeScreen from '@/screens/authenticated/home';
import AboutScreen from '@/screens/about';
import ConfirmationScreen from '@/screens/confirmation';
import useTheme from 'theme/useTheme';

const Stack = createNativeStackNavigator();

export enum PublicRoutes {
  login = 'login',
  confirmation = 'confirmation',
  about = 'about',
}

export enum PrivateRoutes {
  home = 'home',
}

const MyStackRouter = () => {
  const theme = useTheme();

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName={PublicRoutes.login}
        screenOptions={{
          contentStyle: {
            padding: 16,
            justifyContent: 'center',
          },
        }}>
        <Stack.Screen
          name={PublicRoutes.login}
          component={LoginScreen}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name={PublicRoutes.confirmation}
          component={ConfirmationScreen}
          options={{title: 'Confirmação'}}
        />
        <Stack.Screen
          name={PublicRoutes.about}
          component={AboutScreen}
          options={{title: 'Sobre'}}
        />
        <Stack.Screen
          name={PrivateRoutes.home}
          component={HomeScreen}
          options={{title: 'Página inicial'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStackRouter;
