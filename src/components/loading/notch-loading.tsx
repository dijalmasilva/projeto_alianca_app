import React, {useEffect, useRef} from 'react';
import {Animated, Easing, Text} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

type Props = {
  size?: number;
};

const NotchLoading = ({size = 25}: Props) => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{transform: [{rotate: spin}]}}>
      <Text>
        <AntDesignIcon name={'loading2'} size={size} />
      </Text>
    </Animated.View>
  );
};

export default NotchLoading;
