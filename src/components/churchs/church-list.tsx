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
import React, {memo} from 'react';
import useTheme from 'theme/useTheme';
import {Theme} from '@react-navigation/native';

type Props = {
  churchs: Church[];
  onSelectChurch: (church: Church) => void;
};

type RenderItemProps<T> = {
  theme: Theme;
  onSelect: (item: T) => void;
  item: ListRenderItemInfo<T>;
};

const RenderItem = (props: RenderItemProps<Church>) => {
  const {
    item: {item, index},
    theme,
    onSelect,
  } = props;

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
        onPress={() => onSelect(item)}>
        <View style={styles.viewItems}>
          <Avatar name={item.description} size={50} />
          <View style={styles.infoChurch}>
            <Text style={styles.textDescription}>{item.description}</Text>
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
};

const ChurchRenderItem = memo(RenderItem);

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
    flex: 1,
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
    flex: 1,
  },
  textAddress: {
    flexWrap: 'wrap',
  },
});

const _renderItem =
  (theme: Theme, onSelect: (church: Church) => void) =>
  (props: ListRenderItemInfo<Church>) =>
    <ChurchRenderItem theme={theme} onSelect={onSelect} item={props} />;

const ChurchList = ({churchs, onSelectChurch}: Props) => {
  const theme = useTheme();

  return (
    <FlatList
      data={churchs}
      keyExtractor={item => `${item.id}`}
      renderItem={_renderItem(theme, onSelectChurch)}
    />
  );
};

export default ChurchList;
