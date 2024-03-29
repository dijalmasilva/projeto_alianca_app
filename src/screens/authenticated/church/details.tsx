import {Church} from '@prisma/client';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import Button from '@/components/button/Button';
import Avatar from '@/components/avatar/Avatar';
import Input from '@/components/input/Input';
import useUpdateChurch from '@/screens/authenticated/church/hooks/useUpdateChurch';

type RouteParams = {
  church: Church;
};

type Props = {
  route: RouteProp<any>;
  navigation: NavigationProp<any>;
};
const ChurchDetailScreen = ({route, navigation}: Props) => {
  const church = route.params
    ? (route.params as RouteParams).church
    : ({
        id: 0,
        description: '',
        address_city: '',
        address_neighborhood: '',
        address_number: '',
        address_state: '',
        address_street: '',
        address_zipcode: '',
      } as Church);

  const {
    onChangeName,
    onChangeNeighborhood,
    onChangeNumber,
    onChangeDescription,
    onChangeZipcode,
    onChangeStreet,
    onChangeCity,
    onChangeState,
    onSubmit,
  } = useUpdateChurch(navigation, church);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.viewAvatar}>
          <Avatar size={120} name={church.name} canEdit />
        </View>
        <Input
          label="Nome"
          defaultValue={church.name}
          onChangeText={onChangeName}
        />
        <Input
          label="Descrição"
          defaultValue={church.description || ''}
          onChangeText={onChangeDescription}
        />
        <Text style={styles.addressLabel}>Endereço</Text>
        <Input
          label="CEP"
          defaultValue={church.address_zipcode}
          onChangeText={onChangeZipcode}
        />
        <Input
          label="Rua"
          defaultValue={church.address_street}
          onChangeText={onChangeStreet}
        />
        <Input
          label="Número"
          defaultValue={church.address_number}
          onChangeText={onChangeNumber}
        />
        <Input
          label="Bairro"
          defaultValue={church.address_neighborhood}
          onChangeText={onChangeNeighborhood}
        />
        <Input
          label="Cidade"
          defaultValue={church.address_city}
          onChangeText={onChangeCity}
        />
        <Input
          label="Estado"
          defaultValue={church.address_state}
          onChangeText={onChangeState}
        />
        <Button onPress={onSubmit}>
          <Text style={styles.buttonText}>Atualizar</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 16,
  },
  container: {
    gap: 16,
    marginBottom: 24,
  },
  buttonText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
  },
  viewAvatar: {
    alignItems: 'center',
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationStyle: 'double',
    marginLeft: 4,
  },
});

export default ChurchDetailScreen;
