import React from 'react';
import {StyleSheet, Text} from 'react-native';

const HomeScreen = () => {
  return (
    <>
      <Text style={styles.text}>Tela de home</Text>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});

export default HomeScreen;
