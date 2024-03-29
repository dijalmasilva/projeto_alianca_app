import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '@/screens/login';
import AuthenticatedRootScreen from '@/screens/authenticated/root';
import AboutScreen from '@/screens/about';
import ConfirmationScreen from '@/screens/confirmation';
import useTheme from 'theme/useTheme';
import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import {_retrieveToken} from 'utils/storage';
import {PersonActions} from 'store/features/person/person';
import ProfileCompleteScreen from '@/screens/authenticated/profile/complete';
import NotchLoading from '@/components/loading/notch-loading';
import ViewContainer from '@/components/container/ViewContainer';

const Stack = createNativeStackNavigator();

export enum PublicRoutes {
  login = 'login',
  confirmation = 'confirmation',
  about = 'about',
}

export enum PrivateRoutes {
  home = 'home',
  profileComplete = 'profileComplete',
}

const contentDefaultStyles = {
  padding: 16,
};

const MyStackRouter = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [loadedTokenOnStorage, setLoadedToken] = useState<boolean>(false);
  const token = useAppSelector(PersonSelectors.accessToken);

  useEffect(() => {
    (async () => {
      const tokenResult = await _retrieveToken();
      if (tokenResult) {
        dispatch(PersonActions.updateAccessToken(tokenResult));
      }
      setLoadedToken(true);
    })();
  }, []);

  if (!loadedTokenOnStorage) {
    return (
      <ViewContainer center>
        <NotchLoading size={50} />
      </ViewContainer>
    );
  }

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
          component={AuthenticatedRootScreen}
          options={{
            headerShown: false,
            contentStyle: {
              padding: 0,
            },
          }}
        />
        <Stack.Screen
          name={PrivateRoutes.profileComplete}
          component={ProfileCompleteScreen}
          options={{
            title: 'Complete seu perfil',
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
