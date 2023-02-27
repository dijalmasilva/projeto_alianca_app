import React from 'react';
import {StyleSheet, Text} from 'react-native';

const AboutScreen = () => {
  return (
    <>
      <Text style={styles.text}>Tela de About</Text>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});

export default AboutScreen;
