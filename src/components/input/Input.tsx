import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import useTheme from 'theme/useTheme';
import {Theme} from '@react-navigation/native';

type Props = TextInputProps & {
  label: string;
};

const Input = (props: Props) => {
  const theme = useTheme();
  const styleResult = styles(theme);

  return (
    <View style={styleResult.inputView}>
      <Text style={styleResult.label}>{props.label}:</Text>
      <TextInput
        {...props}
        placeholderTextColor={theme.colors.text}
        style={styleResult.input}
      />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    inputView: {
      width: '100%',
    },
    label: {
      fontSize: 16,
      marginLeft: 8,
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      backgroundColor: theme.colors.card,
      padding: 16,
      marginVertical: 8,
      borderRadius: 8,
    },
  });

export default Input;
