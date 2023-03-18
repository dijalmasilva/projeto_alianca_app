import {
  Alert,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useTheme from 'theme/useTheme';
import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import ChurchService from 'store/features/church/church-service';
import Avatar from '@/components/avatar/Avatar';
import PersonSelectors from 'store/features/person/selectors';
import ChurchSelectors from 'store/features/church/selectors';
import {Church} from '@prisma/client';

type Props = {
  onSelect: (value: Church) => void;
  selected?: number;
  placeholder: string;
};

const SelectChurchModal = ({onSelect, placeholder, selected}: Props) => {
  const token = useAppSelector(PersonSelectors.accessToken);
  const churchs = useAppSelector(ChurchSelectors.getChurchs);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [isVisible, setVisible] = useState(false);

  const onSelectItem = (item: Church) => {
    onSelect(item);
    setVisible(false);
  };

  const getItemLayout = (_: any, index: number) => {
    return {
      length: styles.itemList.height,
      offset: styles.itemList.height * index,
      index,
    };
  };

  const toggleModal = () => {
    if (churchs.length > 0) {
      setVisible(prev => !prev);
    } else {
      Alert.alert('Não há igrejas cadastradas');
      dispatch(ChurchService.getChurchs(token));
    }
  };

  useEffect(() => {
    dispatch(ChurchService.getChurchs(token));
  }, []);

  return (
    <>
      <TouchableOpacity
        style={[styles.select, {backgroundColor: theme.colors.card}]}
        onPress={toggleModal}>
        {!selected && (
          <Text style={[{color: theme.colors.text}, styles.placeholder]}>
            {placeholder}
          </Text>
        )}
        {selected && (
          <Text style={[{color: theme.colors.text}, styles.textSelected]}>
            {churchs.find(c => c.id === selected)?.description}
          </Text>
        )}
      </TouchableOpacity>
      <Modal visible={isVisible} animationType="slide">
        <SafeAreaView
          style={{
            backgroundColor: theme.colors.card,
            height: Dimensions.get('screen').height,
          }}>
          <FlatList
            data={churchs}
            getItemLayout={getItemLayout}
            keyExtractor={item => `${item.id}`}
            renderItem={({item, index}: ListRenderItemInfo<Church>) => {
              return (
                <TouchableOpacity
                  key={`select-${item.id}`}
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
              );
            }}
          />
        </SafeAreaView>
      </Modal>
    </>
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
  placeholder: {
    textTransform: 'uppercase',
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
  textSelected: {
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
});

export default SelectChurchModal;
