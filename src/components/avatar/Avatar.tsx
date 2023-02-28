import React from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import useTheme from 'theme/useTheme';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {
  source?: string;
  name?: string;
  canEdit?: boolean;
  onChange?: (source: string) => void;
  backgroundColor?: string | typeof Colors;
  size?: number;
};

type ThemingStyle = {
  backgroundColor: string | typeof Colors;
  size: number;
};

const getLetters = (name: string) => {
  const nameSplit = name.trim().split(' ');
  if (nameSplit.length > 1) {
    return `${nameSplit[0].slice(0, 1)}${nameSplit[1].slice(0, 1)}`;
  }

  return `${name.slice(0, 2)}`;
};

type SymbolEditProps = {
  size: number;
};

const SymbolEdit = ({size}: SymbolEditProps) => {
  return (
    <View style={stylesSymbol(size).symbolView}>
      <Icon name="edit" style={stylesSymbol(size).icon} />
    </View>
  );
};

const stylesSymbol = (size: number) =>
  StyleSheet.create({
    symbolView: {
      position: 'absolute',
      bottom: -2,
      right: 5,
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      fontSize: size / 2.5,
      color: 'white',
    },
  });

const Avatar = ({
  source,
  name,
  canEdit,
  onChange,
  size,
  backgroundColor,
}: Props) => {
  const theme = useTheme();
  const themingStyle: ThemingStyle = {
    backgroundColor: backgroundColor || theme.colors.primary,
    size: size || 30,
  };

  const styleResult = styles(themingStyle);

  const onPress = () => {
    if (!canEdit) {
      return;
    }

    Alert.alert('Você quer colocar uma foto, né?');
  };

  return (
    <Pressable onPress={onPress}>
      <View style={styleResult.view}>
        {canEdit && <SymbolEdit size={themingStyle.size / 3} />}
        {name && <Text style={styleResult.letters}>{getLetters(name)}</Text>}
        {!name && <Icon name="picture" style={styleResult.letters} />}
      </View>
    </Pressable>
  );
};

const styles = ({backgroundColor, size}: ThemingStyle) =>
  StyleSheet.create({
    view: {
      backgroundColor,
      width: size,
      height: size,
      borderRadius: size / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    letters: {
      fontSize: size / 2.5,
      fontWeight: 'bold',
      color: 'white',
      textTransform: 'uppercase',
    },
  });

export default Avatar;
