import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import useTheme from 'theme/useTheme';
import {Theme} from '@react-navigation/native';

type Props = TextInputProps;

const Input = (props: Props) => {
  const theme = useTheme();

  return (
    <TextInput
      {...props}
      placeholderTextColor={theme.colors.text}
      style={styles(theme).input}
    />
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    input: {
      backgroundColor: theme.colors.card,
      padding: 16,
      marginVertical: 8,
      borderRadius: 8,
    },
  });

export default Input;
