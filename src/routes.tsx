import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '@/screens/login';
import HomeScreen from '@/screens/authenticated/home';
import AboutScreen from '@/screens/about';
import ConfirmationScreen from '@/screens/confirmation';
import useTheme from 'theme/useTheme';
import ProfileScreen from '@/screens/authenticated/profile';
import {useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import HeaderRight from '@/components/header-right/HeaderRight';

const Stack = createNativeStackNavigator();

export enum PublicRoutes {
  login = 'login',
  confirmation = 'confirmation',
  about = 'about',
}

export enum PrivateRoutes {
  home = 'home',
  profile = 'profile',
}

const contentDefaultStyles = {
  padding: 16,
};

const MyStackRouter = () => {
  const theme = useTheme();
  const token = useAppSelector(PersonSelectors.accessToken);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName={token ? PrivateRoutes.home : PublicRoutes.login}
        screenOptions={{
          contentStyle: contentDefaultStyles,
        }}>
        <Stack.Screen
          name={PublicRoutes.login}
          component={LoginScreen}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name={PublicRoutes.confirmation}
          component={ConfirmationScreen}
          options={{
            title: 'Confirmação',
            contentStyle: {
              ...contentDefaultStyles,
              justifyContent: 'center',
            },
          }}
        />
        <Stack.Screen
          name={PublicRoutes.about}
          component={AboutScreen}
          options={{title: 'Sobre'}}
        />
        <Stack.Screen
          name={PrivateRoutes.home}
          component={HomeScreen}
          options={{
            title: 'Página inicial',
            headerRight: HeaderRight,
          }}
        />
        <Stack.Screen
          name={PrivateRoutes.profile}
          component={ProfileScreen}
          options={{
            title: 'Perfil',
            contentStyle: {
              ...contentDefaultStyles,
              alignItems: 'flex-start',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStackRouter;
