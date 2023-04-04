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
import {PersonActions} from 'store/features/person/person';
import {CommonActions, NavigationProp} from '@react-navigation/native';
import Avatar from '@/components/avatar/Avatar';
import Input from '@/components/input/Input';
import Button from '@/components/button/Button';
import {PrivateRoutes} from 'routes';
import SwitchWrapper from '@/components/switch/SwitchWrapper';
import CalendarBirthday from '@/components/calendar/CalendarBirthday';
import {format} from 'date-fns/esm';
import {DATE_FORMATS} from '@/components/calendar/calendar.config';
import SelectChurchModal from '@/components/select/select-church-modal';
import PersonSelectors from 'store/features/person/selectors';
import {Church, Role} from '@prisma/client';

type Props = {
  navigation: NavigationProp<any>;
};

const THE_PHONE_NUMBER = '+5583998058971';

const ProfileCompleteScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(PersonSelectors.profile);
  const token = useAppSelector(PersonSelectors.accessToken);
  const loading = useAppSelector(PersonSelectors.loading);
  const [church, setChurch] = useState<Church | undefined>(undefined);

  const [profileState, setProfileState] = useState(profile);

  useEffect(() => {
    dispatch(PersonService.getProfile(token));
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

    if (profileState.phoneNumber !== THE_PHONE_NUMBER) {
      if (!church) {
        Alert.alert('Por favor, selecione a igreja que congrega.');
        return false;
      }
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
      r => r !== Role.OVELHA && r !== Role.VISITANTE,
    );
    if (value) {
      setProfileState({
        ...profileState,
        hasAlliance: value,
        roles: [...roles, Role.OVELHA].filter(r => r !== Role.VISITANTE),
      });
    } else {
      setProfileState({
        ...profileState,
        hasAlliance: value,
        roles: [...roles, Role.VISITANTE].filter(r => r !== Role.OVELHA),
      });
    }
  };

  const onChangeChurch = (churchSelected: Church) => {
    setChurch(churchSelected);
  };

  const onSubmit = async () => {
    if (validateForm()) {
      const {departmentsAsLeader, departmentsAsMember, ...profileResult} =
        profileState;
      const result = await dispatch(
        PersonService.updateProfile({
          accessToken: token,
          id: profileState.id,
          person: {
            ...profileResult,
            ...(profileState.phoneNumber !== THE_PHONE_NUMBER && church
              ? {
                  churchs: {
                    connectOrCreate: {
                      create: {
                        churchId: church.id,
                        assignedAt: new Date().toISOString(),
                      },
                      where: {
                        personId_churchId: {
                          personId: profileState.id,
                          churchId: church.id,
                        },
                      },
                    },
                  },
                }
              : {}),
          },
        }),
      );
      if (PersonService.updateProfile.fulfilled.match(result)) {
        dispatch(
          PersonActions.updateMe({
            ...result.payload,
            departmentsAsMember,
            departmentsAsLeader,
          }),
        );
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: PrivateRoutes.home,
              },
            ],
          }),
        );
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
                selected={church ? church.id : undefined}
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

export default ProfileCompleteScreen;
