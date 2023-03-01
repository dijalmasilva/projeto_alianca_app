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
import SwitchWrapper from '@/components/switch/SwitchWrapper';
import CalendarWrapper, {FORMAT_CALENDAR} from '@/components/calendar/Calendar';
import {format} from 'date-fns/esm';

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

  useEffect(() => {
    setProfileState(profile);
  }, [profile]);

  const onChangeName = (value: string) => {
    setProfileState({...profileState, name: value});
  };

  const onChangeBirthday = (value: string) => {
    setProfileState({...profileState, birthday: value});
  };

  const onChangeAlliance = (value: boolean) => {
    setProfileState({...profileState, hasAlliance: value});
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
            <View style={[styles.keepWidth, {gap: 8}]}>
              <Text style={styles.label}>Data de nascimento:</Text>
              <CalendarWrapper
                current="2023-03-5"
                enableSwipeMonths
                maxDate={format(new Date(), FORMAT_CALENDAR)}
              />
            </View>
            <View style={styles.viewAlliance}>
              <Text style={styles.label}>Possui aliança com Jesus?</Text>
              <SwitchWrapper onChange={onChangeAlliance} />
            </View>
            <Input
              aria-disabled
              label="Igreja que congrega"
              placeholder="Sede Cajazeiras"
              onChangeText={onChangeName}
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
  label: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  viewAlliance: {
    gap: 8,
    alignItems: 'flex-start',
  },
});

export default ProfileScreen;
