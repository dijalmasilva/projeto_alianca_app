import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Avatar from '@/components/avatar/Avatar';
import Input from '@/components/input/Input';
import Button from '@/components/button/Button';
import {NavigationProp} from '@react-navigation/native';
import useCreateChurch from './hooks/useCreateChurch';

type ChurchCreateScreenProps = {
  navigation: NavigationProp<any>;
};

const ChurchCreateScreen = ({navigation}: ChurchCreateScreenProps) => {
  const {
    churchState,
    onChangeState,
    onChangeNeighborhood,
    onChangeDescription,
    onChangeName,
    onChangeStreet,
    onChangeZipcode,
    onChangeNumber,
    onChangeCity,
    onSubmit,
  } = useCreateChurch(navigation);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.viewAvatar}>
          <Avatar size={120} name={churchState.name} canEdit />
        </View>
        <Input
          label="Nome"
          defaultValue={churchState.name}
          onChangeText={onChangeName}
        />
        <Input
          label="Descrição"
          defaultValue={churchState.description || ''}
          onChangeText={onChangeDescription}
        />
        <Text style={styles.addressLabel}>Endereço</Text>
        <Input
          label="CEP"
          defaultValue={churchState.address_zipcode}
          onChangeText={onChangeZipcode}
        />
        <Input
          label="Rua"
          defaultValue={churchState.address_street}
          onChangeText={onChangeStreet}
        />
        <Input
          label="Número"
          defaultValue={churchState.address_number}
          onChangeText={onChangeNumber}
        />
        <Input
          label="Bairro"
          defaultValue={churchState.address_neighborhood}
          onChangeText={onChangeNeighborhood}
        />
        <Input
          label="Cidade"
          defaultValue={churchState.address_city}
          onChangeText={onChangeCity}
        />
        <Input
          label="Estado"
          defaultValue={churchState.address_state}
          onChangeText={onChangeState}
        />
        <Button onPress={onSubmit}>
          <Text style={styles.buttonText}>Cadastrar</Text>
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

export default ChurchCreateScreen;
