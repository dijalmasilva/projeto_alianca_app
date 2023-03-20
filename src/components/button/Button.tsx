import React from 'react';
import {useTheme} from '@react-navigation/native';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

const Button = ({children, style, ...props}: TouchableOpacityProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        style,
        {backgroundColor: theme.colors.primary, shadowColor: theme.colors.text},
        styles.mainButton,
      ]}
      {...props}>
      {children}
    </TouchableOpacity>
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
