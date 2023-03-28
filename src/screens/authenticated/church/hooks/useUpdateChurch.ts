import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import {useEffect, useState} from 'react';
import {Church, Prisma} from '@prisma/client';
import ChurchService from 'store/features/church/church-service';
import {ChurchRoutes} from '@/screens/authenticated/church/root';
import {ChurchActions} from 'store/features/church/church';
import {Alert} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

const useUpdateChurch = (navigation: NavigationProp<any>, church: Church) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(PersonSelectors.accessToken);
  const [churchState, setChurchState] = useState<Prisma.ChurchUpdateInput>({
    name: church.name,
    address_state: church.address_state,
    description: church.description,
    address_city: church.address_city,
    picture: church.picture,
    address_neighborhood: church.address_neighborhood,
    address_street: church.address_street,
    address_number: church.address_number,
    address_zipcode: church.address_zipcode,
    createdAt: church.createdAt,
  });

  useEffect(() => {
    navigation.setOptions({title: church.description});
  }, [church]);

  const onSubmit = async () => {
    if (churchState) {
      const result = await dispatch(
        ChurchService.updateChurch({
          token,
          church: churchState,
          churchId: church.id,
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
    });
  };

  const onChangeName = (text: string) => onChangeChurch(text, 'name');
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

  return {
    onChangeName,
    onChangeDescription,
    onChangeStreet,
    onChangeNumber,
    onChangeNeighborhood,
    onChangeZipcode,
    onChangeCity,
    onChangeState,
    onSubmit,
  };
};

export default useUpdateChurch;
