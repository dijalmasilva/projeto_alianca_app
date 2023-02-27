import {useColorScheme} from 'react-native';
import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';

const MyDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(114, 22, 23)',
  },
};

const MyLigtherTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: 'rgb(114, 22, 23)',
    primary: 'rgb(224, 212, 156)',
  },
};

export default function useTheme(): Theme {
  const isDarkMode = useColorScheme() === 'dark';

  if (isDarkMode) {
    return MyDarkTheme;
  }

  return MyLigtherTheme;
}
