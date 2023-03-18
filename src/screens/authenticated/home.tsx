import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';

const HomeScreen = () => {
  const profile = useAppSelector(PersonSelectors.profile);

  return (
    <View style={styles.homeView}>
      <Text style={styles.profilePrint}>
        {JSON.stringify(profile, null, 2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  homeView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
    borderRadius: 8,
  },
  profilePrint: {
    fontSize: 16,
    color: 'white',
  },
});

export default HomeScreen;
