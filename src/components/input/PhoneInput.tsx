import React from 'react';
import PhoneInput from 'react-native-phone-number-input';
import {StyleSheet, View} from 'react-native';
import useTheme from 'theme/useTheme';
import Icon from 'react-native-vector-icons/FontAwesome5';

type Props = {
  onChangeText?: (text: string) => void;
};

const PhoneInputWrapper = ({onChangeText}: Props) => {
  const theme = useTheme();

  return (
    <View style={{marginVertical: 8}}>
      <PhoneInput
        onChangeFormattedText={onChangeText}
        renderDropdownImage={
          <Icon name="caret-down" color={theme.colors.text} />
        }
        withDarkTheme={theme.dark}
        containerStyle={[
          {backgroundColor: theme.colors.card},
          styles.containerStyle,
        ]}
        textContainerStyle={[
          {
            backgroundColor: theme.colors.card,
          },
          styles.textContainerStyle,
        ]}
        textInputStyle={{color: theme.colors.text}}
        codeTextStyle={{color: theme.colors.text}}
        placeholder="DDD + Telefone apenas números"
        defaultCode="BR"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    borderRadius: 8,
    margin: 0,
    padding: 0,
  },
  textContainerStyle: {
    borderRadius: 8,
    margin: 0,
    padding: 0,
  },
});

export default PhoneInputWrapper;
