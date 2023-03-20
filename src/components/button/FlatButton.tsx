import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ReactNode} from 'react';
import useTheme from 'theme/useTheme';

type FlatButtonProps = {
  children: ReactNode;
  onPress: () => void;
};

const FlatButton = ({children, onPress}: FlatButtonProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[styles.flatButton, {backgroundColor: theme.colors.primary}]}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flatButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    padding: 12,
    borderRadius: 50,
    zIndex: 10,
  },
});

export default FlatButton;
