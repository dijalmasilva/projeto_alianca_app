import useTheme from 'theme/useTheme';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';

type HeaderButtonProps = {
  onPress: () => void;
};

const HeaderButton = ({onPress}: HeaderButtonProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        stylesHeader.headerRight,
        stylesHeader.bt,
        {backgroundColor: theme.colors.primary},
      ]}
      onPress={onPress}>
      <Icon name="plus" size={20} />
    </TouchableOpacity>
  );
};

const stylesHeader = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    gap: 4,
  },
  text: {
    fontSize: 16,
  },
  bt: {
    padding: 8,
    borderRadius: 50,
  },
});

export default HeaderButton;
