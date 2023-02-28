import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import PersonService from 'store/features/person/person-service';
import {
  accessTokenSelector,
  personLoadingSelector,
  profileSelector,
  updateMe,
} from 'store/features/person/person';
import {NavigationProp} from '@react-navigation/native';
import Avatar from '@/components/avatar/Avatar';
import Input from '@/components/input/Input';
import Button from '@/components/button/Button';
import {PrivateRoutes} from 'routes';

type Props = {
  navigation: NavigationProp<any>;
};

const ProfileScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(profileSelector);
  const token = useAppSelector(accessTokenSelector);
  const loading = useAppSelector(personLoadingSelector);

  const [profileState, setProfileState] = useState(profile);

  useEffect(() => {
    if (!profile.name) {
      navigation.setOptions({title: 'Complete seu perfil'});
      dispatch(PersonService.getProfile(token));
    }
  }, []);

  const onChangeName = (value: string) => {
    setProfileState({...profileState, name: value});
  };

  const onChangeBirthday = (value: string) => {
    setProfileState({...profileState, birthday: value});
  };

  const onChangeAlliance = (value: string) => {
    const hasAlliance = value.toLowerCase() === 'sim';
    setProfileState({...profileState, hasAlliance});
  };

  const onSubmit = () => {
    dispatch(updateMe(profileState));
    navigation.navigate(PrivateRoutes.home);
  };

  if (loading) {
    return (
      <View style={styles.viewLoading}>
        <Text>Carregando os dados...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.keepWidth}>
      <ScrollView style={styles.keepWidth}>
        <View style={styles.profileView}>
          <View style={styles.viewAvatar}>
            <Avatar size={120} name={profileState.name} />
          </View>
          <View style={styles.formView}>
            <Input
              label="Nome completo"
              placeholder="Insira seu nome"
              value={profileState.name}
              onChangeText={onChangeName}
            />
            <Input
              label="Data de nascimento"
              placeholder="dd/mm/aaaa"
              value={profileState.birthday}
              onChangeText={onChangeBirthday}
            />
            <Input
              label="Possui aliança com Jesus?"
              placeholder="Sim"
              value={profileState.hasAlliance ? 'Sim' : 'Não'}
              onChangeText={onChangeAlliance}
            />
            <Input
              label="Igreja que congrega"
              placeholder="Sede Cajazeiras"
              onChangeText={onChangeAlliance}
            />
          </View>
          <Button onPress={onSubmit}>
            <Text style={styles.buttonText}>Enviar</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keepWidth: {
    width: '100%',
  },
  viewLoading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 28,
  },
  viewAvatar: {
    alignItems: 'center',
  },
  formView: {
    width: '100%',
    alignItems: 'flex-start',
    gap: 16,
  },
  buttonText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ProfileScreen;
