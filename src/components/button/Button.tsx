import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Pressable, StyleSheet} from 'react-native';
import {PressableProps} from 'react-native/Libraries/Components/Pressable/Pressable';

const Button = ({children, ...props}: PressableProps) => {
  const theme = useTheme();

  return (
    <Pressable
      style={[{backgroundColor: theme.colors.primary}, styles.mainButton]}
      {...props}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainButton: {
    padding: 16,
    borderRadius: 8,
  },
});

export default Button;
