import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import ChurchSelectors from 'store/features/church/selectors';
import PersonSelectors from 'store/features/person/selectors';
import {useEffect} from 'react';
import ChurchService from 'store/features/church/church-service';
import {Church} from '@prisma/client';
import {ChurchRoutes} from '@/screens/authenticated/church/root';
import {NavigationProp} from '@react-navigation/native';

const useChurchList = (navigation: NavigationProp<any>) => {
  const dispatch = useAppDispatch();
  const churchs = useAppSelector(ChurchSelectors.getChurchs);
  const token = useAppSelector(PersonSelectors.accessToken);
  const loading = useAppSelector(ChurchSelectors.loading);

  useEffect(() => {
    if (churchs.length === 0) {
      dispatch(ChurchService.getChurchs(token));
    }
  }, []);

  const onSelectItem = (church: Church) => {
    navigation.navigate(ChurchRoutes.details, {church});
  };

  const createChurch = () => {
    navigation.navigate(ChurchRoutes.create);
  };

  return {
    onSelectItem,
    createChurch,
    churchs,
    loading,
  };
};

export default useChurchList;
