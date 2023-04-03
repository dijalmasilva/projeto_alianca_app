import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import {useEffect, useState} from 'react';
import PersonService from 'store/features/person/person-service';
import {Alert} from 'react-native';
import {ROLE} from 'constants/roles.constants';
import {_storeToken} from 'utils/storage';
import {PrivateRoutes, PublicRoutes} from 'routes';
import {PersonActions} from 'store/features/person/person';
import {CommonActions, NavigationProp} from '@react-navigation/native';

const useUpdateProfile = (navigation: NavigationProp<any>) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(PersonSelectors.profile);
  const token = useAppSelector(PersonSelectors.accessToken);
  const loading = useAppSelector(PersonSelectors.loading);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [profileState, setProfileState] = useState(profile);

  const loadProfile = async () => {
    dispatch(PersonService.getProfile(token));
  };

  useEffect(() => {
    if (!profile.name) {
      (async () => {
        await loadProfile();
      })();
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

  const logout = async () => {
    await dispatch(PersonService.logout(token));
    await _storeToken('');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: PublicRoutes.login,
          },
        ],
      }),
    );
    navigation.navigate(PublicRoutes.login);
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
        navigation.navigate(PrivateRoutes.home);
      } else {
        Alert.alert(result.payload as string);
      }
    }
  };

  return {
    loading,
    profileState,
    logout,
    onChangeName,
    onChangeBirthday,
    onChangeAlliance,
    onSubmit,
    refreshing,
    setRefreshing,
    loadProfile,
  };
};

export default useUpdateProfile;
