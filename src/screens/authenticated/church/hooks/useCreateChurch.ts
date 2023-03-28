import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import {useState} from 'react';
import {Church, Prisma} from '@prisma/client';
import ChurchService from 'store/features/church/church-service';
import {ChurchRoutes} from '@/screens/authenticated/church/root';
import {ChurchActions} from 'store/features/church/church';
import {Alert} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

const useCreateChurch = (navigation: NavigationProp<any>) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(PersonSelectors.accessToken);
  const [churchState, setChurchState] = useState<Prisma.ChurchCreateInput>({
    name: '',
    address_state: '',
    description: '',
    address_city: '',
    picture: '',
    address_neighborhood: '',
    address_street: '',
    address_number: '',
    address_zipcode: '',
  });

  const onSubmit = async () => {
    if (churchState) {
      const result = await dispatch(
        ChurchService.createChurch({
          token,
          church: churchState,
        }),
      );
      if (ChurchService.createChurch.fulfilled.match(result)) {
        navigation.navigate(ChurchRoutes.churchs);
        const churchResult = result.payload.data as Church;
        dispatch(ChurchActions.addChurchOrUpdate(churchResult));
      } else {
        Alert.alert('Houve um erro ao tentar criar a igreja');
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
    churchState,
  };
};

export default useCreateChurch;
