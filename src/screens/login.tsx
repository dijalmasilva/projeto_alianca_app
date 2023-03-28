import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Button from '@/components/button/Button';
import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import PersonService from 'store/features/person/person-service';
import PhoneInputWrapper from '@/components/input/PhoneInput';
import {PublicRoutes} from 'routes';
import {PersonActions} from 'store/features/person/person';
import {phoneNumberRegex} from 'utils/regexs';
import PersonSelectors from 'store/features/person/selectors';

type Props = {
  navigation: NavigationProp<any>;
};

const LoginScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(PersonSelectors.loading);
  const [number, setNumber] = useState<string>('');

  const validateNumber = (phoneNumber: string) => {
    if (phoneNumber.length !== 14 && !phoneNumberRegex.test(phoneNumber)) {
      Alert.alert(
        'Telefone incorreto. Verifique se você digitou o DDD, e o "9" antes do número',
      );
      return false;
    }

    return true;
  };

  const requestCode = async () => {
    if (validateNumber(number)) {
      const result = await dispatch(PersonService.requestCode(number));
      if (PersonService.requestCode.fulfilled.match(result)) {
        dispatch(PersonActions.setMyPhoneNumber(number));
        navigation.navigate(PublicRoutes.confirmation);
      } else {
        Alert.alert(result.payload as string);
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.logoView}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.textLogo}>Projeto Aliança</Text>
        </View>
        <PhoneInputWrapper
          onChangeText={setNumber}
          textInputProps={{onBlur: requestCode}}
        />
        <Button onPress={requestCode} loading={loading}>
          <Text style={styles.loginBtText}>Entrar</Text>
        </Button>
      </ScrollView>
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
