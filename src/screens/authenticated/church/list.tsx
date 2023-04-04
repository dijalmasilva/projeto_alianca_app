import React, {useEffect} from 'react';
import {NavigationProp} from '@react-navigation/native';
import ChurchList from '@/components/churchs/church-list';
import {StyleSheet, View} from 'react-native';
import NotchLoading from '@/components/loading/notch-loading';
import ViewContainer from '@/components/container/ViewContainer';
import useChurchList from '@/screens/authenticated/church/hooks/useChurchList';
import useRoleHook from '@/hooks/useRoleHook';
import HeaderButton from '@/components/button/HeaderButton';
import {useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import {Role} from '@prisma/client';

type Props = {
  navigation: NavigationProp<any>;
};

const _headerRight = (onPress: () => void) => () => {
  return <HeaderButton onPress={onPress} />;
};

const ChurchScreen = ({navigation}: Props) => {
  const {canRender} = useRoleHook(useAppSelector(PersonSelectors.roles));
  const {loading, createChurch, onSelectItem, churchs} =
    useChurchList(navigation);

  useEffect(() => {
    if (canRender([Role.ADMIN])) {
      navigation.setOptions({
        headerRight: _headerRight(createChurch),
      });
    }
  }, []);

  if (loading) {
    return (
      <ViewContainer center>
        <NotchLoading size={50} />
      </ViewContainer>
    );
  }

  return (
    <View style={styles.container}>
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
