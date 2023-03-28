import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Church} from '@prisma/client';
import React from 'react';
import useTheme from 'theme/useTheme';
import Avatar from '@/components/avatar/Avatar';

type ChurchListProps = {
  churchs: Church[];
  onSelectChurch: (church: Church) => void;
};

const ChurchList = ({churchs, onSelectChurch}: ChurchListProps) => {
  const theme = useTheme();

  return (
    <View>
      {churchs.map((church, index) => {
        return (
          <View key={`select-${church.id}`}>
            <TouchableOpacity
              style={[
                {
                  backgroundColor:
                    index % 2 ? theme.colors.card : theme.colors.border,
                },
                styles.itemList,
              ]}
              onPress={() => onSelectChurch(church)}>
              <View style={styles.viewItems}>
                <Avatar name={church.name} size={50} />
                <View style={styles.infoChurch}>
                  <Text style={styles.textName}>{church.name}</Text>
                  {church.description && (
                    <Text style={styles.textDescription}>
                      {church.description}
                    </Text>
                  )}
                  <Text style={styles.textAddress}>
                    <Text style={styles.textAddressLabel}>Endereço: </Text>
                    {[
                      church.address_street,
                      church.address_number,
                      church.address_neighborhood,
                      church.address_city,
                      church.address_state,
                      church.address_zipcode,
                    ]
                      .filter(i => i)
                      .join(', ')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
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
    flex: 1,
  },
  textName: {
    fontSize: 18,
    fontWeight: '600',
  },
  textDescription: {
    fontSize: 14,
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
    fontSize: 12,
    flexWrap: 'wrap',
  },
});

export default ChurchList;
