import useTheme from 'theme/useTheme';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};
const ViewContainer = ({children, style}: Props) => {
  const theme = useTheme();

  return (
    <View
      style={[
        style,
        styles.viewContainer,
        {backgroundColor: theme.colors.background},
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
