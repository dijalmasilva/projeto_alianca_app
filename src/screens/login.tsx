import React, {useState} from 'react';
import {Alert, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {PublicRoutes} from 'routes';
import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import {useAppDispatch} from '@/hooks/store-hook';
import {setMyPhoneNumber} from 'store/features/person';

type Props = {
  navigation: NavigationProp<any>;
};

const LoginScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const [number, setNumber] = useState<string>('');

  const login = () => {
    if (!number) {
      return Alert.prompt('Você precisa fornecer o número de telefone');
    }
    dispatch(setMyPhoneNumber(number));
    navigation.navigate(PublicRoutes.confirmation);
  };

  return (
    <SafeAreaView>
      <View style={styles.logoView}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.textLogo}>Projeto Aliança</Text>
      </View>
      <Input
        onChangeText={setNumber}
        value={number}
        placeholder="Insira o número de telefone"
        keyboardType="phone-pad"
      />
      <Button onPress={login}>
        <Text style={styles.loginBtText}>Entrar</Text>
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 320,
    height: 280,
  },
  loginBtText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  textLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -16,
    marginBottom: 16,
  },
});

export default LoginScreen;
