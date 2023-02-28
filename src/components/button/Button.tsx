import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Pressable, StyleSheet} from 'react-native';
import {PressableProps} from 'react-native/Libraries/Components/Pressable/Pressable';

const Button = ({children, ...props}: PressableProps) => {
  const theme = useTheme();

  return (
    <Pressable
      style={[
        {backgroundColor: theme.colors.primary, shadowColor: theme.colors.text},
        styles.mainButton,
      ]}
      {...props}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainButton: {
    minWidth: 200,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 8,
  },
});

export default Button;
