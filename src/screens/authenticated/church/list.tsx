import React, {useEffect} from 'react';
import {Church} from '@prisma/client';
import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import ChurchSelectors from 'store/features/church/selectors';
import useTheme from 'theme/useTheme';
import ChurchService from 'store/features/church/church-service';
import PersonSelectors from 'store/features/person/selectors';
import FlatButton from '@/components/button/FlatButton';
import Icon from 'react-native-vector-icons/AntDesign';
import {NavigationProp} from '@react-navigation/native';
import {ChurchRoutes} from '@/screens/authenticated/church/root';
import ChurchList from '@/components/churchs/church-list';
import {StyleSheet, View} from 'react-native';
import Loading from '@/components/loading/loading';

type Props = {
  navigation: NavigationProp<any>;
};
const ChurchScreen = ({navigation}: Props) => {
  const theme = useTheme();
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

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatButton onPress={createChurch}>
        <Icon name="plus" size={25} color={theme.colors.text} />
      </FlatButton>
      <ChurchList churchs={churchs} onSelectChurch={onSelectItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChurchScreen;
