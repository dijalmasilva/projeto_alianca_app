import React, {useEffect} from 'react';
import {NavigationProp} from '@react-navigation/native';
import ChurchList from '@/components/churchs/church-list';
import {StyleSheet, View} from 'react-native';
import NotchLoading from '@/components/loading/notch-loading';
import ViewContainer from '@/components/container/ViewContainer';
import useChurchList from '@/screens/authenticated/church/hooks/useChurchList';
import useRoleHook from '@/hooks/useRoleHook';
import {ROLE} from 'constants/roles.constants';
import HeaderButton from '@/components/button/HeaderButton';

type Props = {
  navigation: NavigationProp<any>;
};

const _headerRight = (onPress: () => void) => () => {
  return <HeaderButton onPress={onPress} />;
};

const ChurchScreen = ({navigation}: Props) => {
  const {canRender} = useRoleHook();
  const {loading, createChurch, onSelectItem, churchs} =
    useChurchList(navigation);

  useEffect(() => {
    if (canRender([ROLE.ADMIN])) {
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
