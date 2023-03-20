import React, {useEffect} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Church} from '@prisma/client';
import Avatar from '@/components/avatar/Avatar';
import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import ChurchSelectors from 'store/features/church/selectors';
import useTheme from 'theme/useTheme';
import ChurchService from 'store/features/church/church-service';
import PersonSelectors from 'store/features/person/selectors';
import FlatButton from '@/components/button/FlatButton';
import Icon from 'react-native-vector-icons/AntDesign';
import {NavigationProp} from '@react-navigation/native';
import {ChurchRoutes} from '@/screens/authenticated/church/root';

type Props = {
  navigation: NavigationProp<any>;
};
const ChurchScreen = ({navigation}: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const churchs = useAppSelector(ChurchSelectors.getChurchs);
  const token = useAppSelector(PersonSelectors.accessToken);

  useEffect(() => {
    if (churchs.length === 0) {
      dispatch(ChurchService.getChurchs(token));
    }
  }, [churchs]);

  const onSelectItem = (church: Church) => {
    navigation.navigate(ChurchRoutes.details, {church});
  };

  const createChurch = () => {
    navigation.navigate(ChurchRoutes.details);
  };

  return (
    <View style={styles.container}>
      <FlatButton onPress={createChurch}>
        <Icon name="plus" size={25} color={theme.colors.text} />
      </FlatButton>
      <FlatList
        data={churchs}
        keyExtractor={item => `${item.id}`}
        renderItem={({item, index}: ListRenderItemInfo<Church>) => {
          return (
            <View key={`select-${item.id}`}>
              <TouchableOpacity
                style={[
                  {
                    backgroundColor:
                      index % 2 ? theme.colors.card : theme.colors.border,
                  },
                  styles.itemList,
                ]}
                onPress={() => onSelectItem(item)}>
                <View style={styles.viewItems}>
                  <Avatar name={item.description} size={50} />
                  <View style={styles.infoChurch}>
                    <Text style={styles.textDescription}>
                      {item.description}
                    </Text>
                    <Text style={styles.textAddress}>
                      <Text style={styles.textAddressLabel}>Endereço: </Text>
                      {[
                        item.address_street,
                        item.address_number,
                        item.address_neighborhood,
                        item.address_city,
                        item.address_state,
                        item.address_zipcode,
                      ]
                        .filter(i => i)
                        .join(', ')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  select: {
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  itemList: {
    paddingHorizontal: 16,
    height: 100,
    justifyContent: 'center',
  },
  infoChurch: {
    gap: 4,
  },
  textDescription: {
    fontSize: 18,
    fontWeight: '600',
  },
  textAddressLabel: {
    fontWeight: 'bold',
  },
  viewItems: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  textAddress: {
    flexWrap: 'wrap',
    paddingRight: 32,
  },
  container: {
    flex: 1,
  },
});

export default ChurchScreen;
