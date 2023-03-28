import React from 'react';
import {useTheme} from '@react-navigation/native';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import Color from 'color';
import NotchLoading from '@/components/loading/notch-loading';

type Props = TouchableOpacityProps & {
  loading?: boolean;
};

const Button = ({children, style, loading = false, ...props}: Props) => {
  const {colors} = useTheme();
  const backgroundColor = Color(colors.primary).darken(0.2).hex();

  if (loading) {
    return (
      <View
        style={[
          style,
          {
            backgroundColor: backgroundColor,
            shadowColor: colors.text,
          },
          styles.mainButton,
        ]}>
        <NotchLoading />
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[
        style,
        {backgroundColor: colors.primary, shadowColor: colors.text},
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
