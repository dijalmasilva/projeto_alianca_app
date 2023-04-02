import React, {useEffect} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Avatar from '@/components/avatar/Avatar';
import Input from '@/components/input/Input';
import Button from '@/components/button/Button';
import SwitchWrapper from '@/components/switch/SwitchWrapper';
import CalendarBirthday from '@/components/calendar/CalendarBirthday';
import {format} from 'date-fns/esm';
import {DATE_FORMATS} from '@/components/calendar/calendar.config';
import Icon from 'react-native-vector-icons/FontAwesome';
import useUpdateProfile from './hooks/useUpdateProfile';
import useTheme from 'theme/useTheme';
import ViewContainer from '@/components/container/ViewContainer';
import NotchLoading from '@/components/loading/notch-loading';

type Props = {
  navigation: NavigationProp<any>;
};

type ButtonLogoutProps = {
  logout: () => void;
};

const ButtonLogout = ({logout}: ButtonLogoutProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={logout}
      style={[stylesButton.button, {backgroundColor: theme.colors.primary}]}>
      <Icon name="sign-out" size={20} color="#fff" />
    </TouchableOpacity>
  );
};

const stylesButton = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 50,
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});

const _buttonLogout = (logout: () => void) => () =>
  <ButtonLogout logout={logout} />;

const ProfileScreen = ({navigation}: Props) => {
  const {
    loading,
    profileState,
    onChangeAlliance,
    onChangeBirthday,
    onChangeName,
    logout,
    onSubmit,
    loadProfile,
    refreshing,
    setRefreshing,
  } = useUpdateProfile(navigation);

  useEffect(() => {
    if (profileState.id) {
      navigation.setOptions({
        headerRight: _buttonLogout(logout),
      });
    }
  }, [profileState]);

  if (loading) {
    return (
      <ViewContainer center>
        <NotchLoading size={50} />
      </ViewContainer>
    );
  }

  return (
    <SafeAreaView style={styles.keepWidth}>
      <ScrollView
        style={styles.keepWidth}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              loadProfile().finally(() => setRefreshing(false));
            }}
          />
        }>
        <View style={styles.profileView}>
          <View style={styles.viewAvatar}>
            <Avatar size={120} name={profileState.name} />
          </View>
          <View style={styles.formView}>
            <Input
              label="Nome completo"
              placeholder="Insira seu nome"
              value={profileState.name}
              onChangeText={onChangeName}
            />
            <View style={[styles.keepWidth]}>
              <Text style={styles.label}>Data de nascimento:</Text>
              <CalendarBirthday
                onSelect={onChangeBirthday}
                enableSwipeMonths
                maxDate={format(new Date(), DATE_FORMATS.calendar)}
              />
            </View>
            <View style={styles.viewAlliance}>
              <Text style={styles.label}>Possui aliança com Jesus?</Text>
              <SwitchWrapper
                onChange={onChangeAlliance}
                defaultValue={profileState.hasAlliance}
              />
            </View>
          </View>
          <Button onPress={onSubmit}>
            <Text style={styles.buttonText}>Enviar</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keepWidth: {
    width: '100%',
    gap: 8,
  },
  viewLoading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 28,
    padding: 16,
  },
  viewAvatar: {
    alignItems: 'center',
  },
  formView: {
    width: '100%',
    alignItems: 'flex-start',
    gap: 16,
  },
  buttonText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
  },
  label: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  viewAlliance: {
    gap: 8,
    alignItems: 'flex-start',
    marginBottom: 8,
  },
});

export default ProfileScreen;
