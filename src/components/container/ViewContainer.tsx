import useTheme from 'theme/useTheme';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  center?: boolean;
};
const ViewContainer = ({children, style, center}: Props) => {
  const theme = useTheme();

  return (
    <View
      style={[
        style,
        styles.viewContainer,
        {backgroundColor: theme.colors.background},
        center && {alignItems: 'center', justifyContent: 'center'},
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    padding: 16,
    flex: 1,
  },
});

export default ViewContainer;
