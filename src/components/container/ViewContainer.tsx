import useTheme from 'theme/useTheme';
import {StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';

type Props = {
  children: ReactNode;
};
const ViewContainer = ({children}: Props) => {
  const theme = useTheme();

  return (
    <View
      style={[
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
