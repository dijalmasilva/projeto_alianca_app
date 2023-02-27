import React from 'react';
import {Text, View} from 'react-native';
import {useAppSelector} from '@/hooks/store-hook';
import {personLoadingSeletor} from 'store/features/person/person';

type Props = {};

const ConfirmationScreen = ({}: Props) => {
  const personLoading = useAppSelector(personLoadingSeletor);
  const me = useAppSelector(state => state.person.me);
  const code = useAppSelector(state => state.person.auth.code);

  if (personLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Tela de Confirmação</Text>
      <Text>Número inserido: {me.phoneNumber}</Text>
      <Text>Código: {code}</Text>
    </View>
  );
};

export default ConfirmationScreen;
