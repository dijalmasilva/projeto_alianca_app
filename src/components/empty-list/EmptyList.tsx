import {StyleSheet, Text, View} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import React from 'react';

type Props = {
  text: string;
};

const EmptyList = ({text}: Props) => {
  return (
    <View style={styles.emptyContainer}>
      <EntypoIcon name="text-document" size={25} />
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
});

export default EmptyList;
