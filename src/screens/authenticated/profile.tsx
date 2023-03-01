import React, {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import CalendarBirthday from '@/components/calendar/CalendarBirthday';
import {format} from 'date-fns/esm';
import {DATE_FORMATS} from '@/components/calendar/calendar.config';
import SelectChurchModal from '@/components/select/select-church-modal';
import {Church} from 'types/Church';
import {ROLE} from 'constants/roles.constants';

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

  const validateForm = () => {
    if (!profileState.name) {
      Alert.alert('Por favor, insira o nome completo.');
      return false;
    }

    if (!profileState.birthday) {
      Alert.alert('Por favor, selecione sua data de nascimento.');
      return false;
    }

    return true;
  };

  const onChangeName = (value: string) => {
    setProfileState({...profileState, name: value});
  };

  const onChangeBirthday = (value: string) => {
    setProfileState({...profileState, birthday: value});
  };

  const onChangeAlliance = (value: boolean) => {
    //remove first VISITOR and SHEEP to add after
    const roles = profileState.roles.filter(
      r => r !== ROLE.SHEEP && r !== ROLE.VISITOR,
    );
    if (value) {
      setProfileState({
        ...profileState,
        hasAlliance: value,
        roles: [...roles, ROLE.SHEEP].filter(r => r !== ROLE.VISITOR),
      });
    } else {
      setProfileState({
        ...profileState,
        hasAlliance: value,
        roles: [...roles, ROLE.VISITOR].filter(r => r !== ROLE.SHEEP),
      });
    }
  };

  const onChangeChurch = (church: Church) => {
    setProfileState({...profileState, churchs: [church]});
  };

  const onSubmit = async () => {
    if (validateForm()) {
      const result = await dispatch(
        PersonService.updateProfile({accessToken: token, data: profileState}),
      );
      if (PersonService.updateProfile.fulfilled.match(result)) {
        dispatch(updateMe(profileState));
        navigation.navigate(PrivateRoutes.home);
      } else {
        Alert.alert(result.payload as string);
      }
    }
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
            <View style={[styles.keepWidth]}>
              <Text style={styles.label}>Data de nascimento:</Text>
              <CalendarBirthday
                onSelect={onChangeBirthday}
                enableSwipeMonths
                maxDate={format(new Date(), DATE_FORMATS.calendar)}
              />
            </View>
            <View style={styles.viewAlliance}>
              <Text style={styles.label}>Possui aliança com Jesus?</Text>
              <SwitchWrapper onChange={onChangeAlliance} />
            </View>
            <View style={styles.keepWidth}>
              <Text style={styles.label}>Qual igreja congrega?</Text>
              <SelectChurchModal
                onSelect={onChangeChurch}
                selected={
                  profileState.churchs.length > 0
                    ? profileState.churchs[0].id
                    : undefined
                }
                placeholder="Clique aqui para selecionar"
              />
            </View>
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
    gap: 8,
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
    marginBottom: 8,
  },
});

export default ProfileScreen;
