import {Church, Prisma} from '@prisma/client';
import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import Button from '@/components/button/Button';
import Avatar from '@/components/avatar/Avatar';
import Input from '@/components/input/Input';
import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import ChurchService from 'store/features/church/church-service';
import {ChurchRoutes} from '@/screens/authenticated/church/root';
import {ChurchActions} from 'store/features/church/church';

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
    : undefined;
  const dispatch = useAppDispatch();
  const token = useAppSelector(PersonSelectors.accessToken);
  const [churchState, setChurchState] = useState<
    Church | Prisma.ChurchCreateInput | undefined
  >(undefined);
  const isNewChurch = !church;

  useEffect(() => {
    navigation.setOptions({title: church ? church.description : 'Nova igreja'});
    setChurchState(church);
  }, [church]);

  const onSubmit = async () => {
    if (isNewChurch) {
      const result = await dispatch(
        ChurchService.createChurch({
          token,
          church: churchState as Prisma.ChurchCreateInput,
        }),
      );
      if (ChurchService.createChurch.fulfilled.match(result)) {
        navigation.navigate(ChurchRoutes.churchs);
        const churchResult = result.payload.data as Church;
        dispatch(ChurchActions.addChurchOrUpdate(churchResult));
      } else {
        Alert.alert('Houve um erro ao tentar criar a igreja');
      }
    } else {
      const result = await dispatch(
        ChurchService.updateChurch({
          token,
          church: churchState as Church,
        }),
      );

      if (ChurchService.updateChurch.fulfilled.match(result)) {
        navigation.navigate(ChurchRoutes.churchs);
        const churchResult = result.payload.data as Church;
        dispatch(ChurchActions.addChurchOrUpdate(churchResult));
      } else {
        Alert.alert(
          'Houve um erro ao tentar atualizar as informações dessa igreja',
        );
      }
    }
  };

  const onChangeChurch = (text: string, key: string) => {
    setChurchState({
      ...churchState,
      [key]: text,
    } as Prisma.ChurchCreateInput);
  };

  const onChangeDescription = (text: string) =>
    onChangeChurch(text, 'description');

  const onChangeStreet = (text: string) =>
    onChangeChurch(text, 'address_street');

  const onChangeNumber = (text: string) =>
    onChangeChurch(text, 'address_number');

  const onChangeNeighborhood = (text: string) =>
    onChangeChurch(text, 'address_neighborhood');

  const onChangeZipcode = (text: string) =>
    onChangeChurch(text, 'address_zipcode');

  const onChangeCity = (text: string) => onChangeChurch(text, 'address_city');

  const onChangeState = (text: string) => onChangeChurch(text, 'address_state');

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.viewAvatar}>
          <Avatar size={120} name={churchState?.description} canEdit />
        </View>
        <Input
          label="Descrição"
          defaultValue={churchState?.description}
          onChangeText={onChangeDescription}
        />
        <Text style={styles.addressLabel}>Endereço</Text>
        <Input
          label="CEP"
          defaultValue={churchState?.address_zipcode}
          onChangeText={onChangeZipcode}
        />
        <Input
          label="Rua"
          defaultValue={churchState?.address_street}
          onChangeText={onChangeStreet}
        />
        <Input
          label="Número"
          defaultValue={churchState?.address_number}
          onChangeText={onChangeNumber}
        />
        <Input
          label="Bairro"
          defaultValue={churchState?.address_neighborhood}
          onChangeText={onChangeNeighborhood}
        />
        <Input
          label="Cidade"
          defaultValue={churchState?.address_city}
          onChangeText={onChangeCity}
        />
        <Input
          label="Estado"
          defaultValue={churchState?.address_state}
          onChangeText={onChangeState}
        />
        <Button onPress={onSubmit}>
          <Text style={styles.buttonText}>
            {isNewChurch ? 'Cadastrar' : 'Atualizar'}
          </Text>
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
