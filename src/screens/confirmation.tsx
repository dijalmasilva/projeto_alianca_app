import React from 'react';
import {Text, View} from 'react-native';
import {useAppSelector} from '@/hooks/store-hook';

type Props = {};

const ConfirmationScreen = ({}: Props) => {
  const me = useAppSelector(state => state.person.me);

  return (
    <View>
      <Text>Tela de Confirmação</Text>
      <Text>Número inserido: {me.phoneNumber}</Text>
    </View>
  );
};

export default ConfirmationScreen;
