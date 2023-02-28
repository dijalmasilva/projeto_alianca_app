import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useTheme from 'theme/useTheme';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {CommonActions, NavigationProp, Theme} from '@react-navigation/native';
import PersonService from 'store/features/person/person-service';
import {updateAccessToken} from 'store/features/person/person';
import {PrivateRoutes} from 'routes';

type Props = {
  navigation: NavigationProp<any>;
};

const CELL_COUNT = 6;

const ConfirmationScreen = ({navigation}: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const me = useAppSelector(state => state.person.me);
  const code = useAppSelector(state => state.person.auth.code);

  const hintTextStyle = {
    color: theme.colors.primary,
    fontWeight: 'bold',
  } as StyleProp<TextProps>;

  const [codeConfirmation, setCodeConfirmation] = useState('');
  const ref = useBlurOnFulfill({
    value: codeConfirmation,
    cellCount: CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: codeConfirmation,
    setValue: setCodeConfirmation,
  });

  const submitCode = async () => {
    if (codeConfirmation.length === CELL_COUNT) {
      const resultLogin = await dispatch(
        PersonService.login({
          username: me.phoneNumber,
          password: codeConfirmation,
        }),
      );

      if (PersonService.login.fulfilled.match(resultLogin)) {
        const {payload} = resultLogin;
        dispatch(updateAccessToken(payload.accessToken));
        if (payload.isNewUser) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: PrivateRoutes.profile,
                },
              ],
            }),
          );
          navigation.navigate(PrivateRoutes.profile);
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: PrivateRoutes.home,
                },
              ],
            }),
          );
          navigation.navigate(PrivateRoutes.home);
        }
      } else {
        Alert.alert(resultLogin.payload as string);
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles(theme).confirmationView}>
          <Text style={styles(theme).primaryText}>Código de confirmação</Text>
          <Icon name="phonelink-lock" color={theme.colors.primary} size={150} />
          <Text style={styles(theme).textConfirmation}>
            Por favor insira o{' '}
            <Text style={hintTextStyle}>código de confirmação</Text> enviado
            para o número <Text style={hintTextStyle}>{me.phoneNumber}</Text>.
          </Text>
          <Text>Código: {code}</Text>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={codeConfirmation}
            rootStyle={styles(theme).codeFieldRoot}
            onChangeText={setCodeConfirmation}
            blurOnSubmit
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            onBlur={submitCode}
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[
                  styles(theme).cell,
                  isFocused && styles(theme).focusCell,
                ]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    confirmationView: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 28,
    },
    primaryText: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    textConfirmation: {
      fontSize: 16,
      width: 280,
      textAlign: 'center',
    },
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {
      paddingBottom: 24,
    },
    cell: {
      width: 40,
      height: 40,
      paddingTop: 6,
      fontSize: 24,
      borderRadius: 8,
      textAlign: 'center',
      marginHorizontal: 4,
      backgroundColor: theme.colors.card,
    },
    focusCell: {
      borderColor: '#000',
    },
  });

export default ConfirmationScreen;
