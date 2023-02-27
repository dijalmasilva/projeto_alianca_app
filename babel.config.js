module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@/src': './src',
          '@/components': './src/components',
          '@/assets': './src/assets',
          '@/hooks': './src/hooks',
          '@/screens': './src/screens',
        },
      },
    ],
  ],
};
