import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '@/screens/login';
import HomeScreen from '@/screens/authenticated/home';
import AboutScreen from '@/screens/about';
import ConfirmationScreen from '@/screens/confirmation';
import useTheme from 'theme/useTheme';
import ProfileScreen from '@/screens/authenticated/profile';
import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import HeaderRight from '@/components/header-right/HeaderRight';
import {_retrieveToken} from 'utils/storage';
import {PersonActions} from 'store/features/person/person';
import {StyleSheet, View} from 'react-native';
import Loading from '@/components/loading/loading';

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

const styles = StyleSheet.create({
  logoView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 320,
    height: 280,
  },
  textLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -16,
    marginBottom: 16,
  },
});

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
      <View style={styles.logoView}>
        <Loading />
      </View>
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
          component={HomeScreen}
          options={{
            title: 'Página inicial',
            headerRight: HeaderRight,
            headerShown: false,
            contentStyle: {
              padding: 0,
            },
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
