import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import PersonService from 'store/features/person/person-service';
import {
  accessTokenSelector,
  personLoadingSelector,
  profileSelector,
} from 'store/features/person/person';
import {NavigationProp} from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
};

const ProfileScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(profileSelector);
  const token = useAppSelector(accessTokenSelector);
  const loading = useAppSelector(personLoadingSelector);

  useEffect(() => {
    if (!profile.name) {
      navigation.setOptions({title: 'Complete seu perfil'});
      dispatch(PersonService.getProfile(token));
    }
  }, [profile]);

  if (loading) {
    return (
      <View style={styles.viewLoading}>
        <Text>Carregando os dados...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Name: {profile.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewLoading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
