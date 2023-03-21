import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import useVerseDay from '@/hooks/useVerseDay';
import useTheme from 'theme/useTheme';

type Props = {
  hidden?: boolean;
};

const PulseLogo = () => {
  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1.1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]),
      {
        iterations: Infinity,
        resetBeforeIteration: true,
      },
    ).start();
  }, [animation]);

  const animatedStyles = {
    transform: [
      {
        scale: animation,
      },
    ],
  };

  return (
    <Animated.Image
      source={require('@/assets/images/logo.png')}
      style={[styles.logo, animatedStyles]}
    />
  );
};

const Loading = ({hidden = false}: Props) => {
  const theme = useTheme();
  const verse = useVerseDay();
  if (hidden) {
    return <></>;
  }

  return (
    <View style={[styles.logoView, {backgroundColor: theme.colors.background}]}>
      <PulseLogo />
      <Text style={[styles.verse, {color: theme.colors.text}]}>{verse}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 260,
    height: 220,
  },
  verse: {
    textAlign: 'center',
    fontSize: 20,
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    fontWeight: 'bold',
  },
});

export default Loading;
