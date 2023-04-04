import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Agenda} from 'react-native-calendars';
import useTheme from 'theme/useTheme';
import {DATE_FORMATS} from '@/components/calendar/calendar.config';
import {addDays, format, subDays} from 'date-fns';
import HeaderButton from '@/components/button/HeaderButton';
import {NavigationProp} from '@react-navigation/native';
import useRoleHook from '@/hooks/useRoleHook';
import useListEvents from '@/screens/authenticated/events/hooks/useListEvents';
import EmptyList from '@/components/empty-list/EmptyList';
import {useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import {Role} from '@prisma/client';

const _headerRight = (onPress: () => void) => () =>
  <HeaderButton onPress={onPress} />;

type Props = {
  navigation: NavigationProp<any>;
};

const EventListScreen = ({navigation}: Props) => {
  const {createEvent, refreshing, events, loadEventsByDay} =
    useListEvents(navigation);
  const {canRender} = useRoleHook(useAppSelector(PersonSelectors.roles));

  useEffect(() => {
    console.log('canRender', canRender([Role.ADMIN, Role.PASTOR]));
    if (canRender([Role.ADMIN, Role.PASTOR])) {
      navigation.setOptions({
        headerRight: _headerRight(createEvent),
      });
    }
  }, []);

  const today = new Date();
  const theme = useTheme();

  return (
    <Agenda
      initialNumToRender={4}
      theme={{
        calendarBackground: theme.colors.card,
        arrowColor: theme.colors.primary,
        textSectionTitleColor: theme.colors.text,
        monthTextColor: theme.colors.primary,
        dayTextColor: theme.colors.text,
        textDisabledColor: 'rgba(144,144,144,0.33)',
        textInactiveColor: 'rgba(144,144,144)',
        selectedDayTextColor: theme.colors.text,
        selectedDayBackgroundColor: theme.colors.primary,
        indicatorColor: theme.colors.primary,
        todayTextColor: theme.colors.primary,
        selectedDotColor: theme.colors.primary,
      }}
      minDate={format(subDays(today, 15), DATE_FORMATS.calendar)}
      maxDate={format(addDays(today, 40), DATE_FORMATS.calendar)}
      selected={format(today, DATE_FORMATS.calendar)}
      refreshing={refreshing}
      onRefresh={async () => {
        await loadEventsByDay(format(today, DATE_FORMATS.calendar));
      }}
      renderList={() => {
        return <></>;
      }}
      renderEmptyData={() => (
        <View
          style={[
            styles.emptyData,
            {backgroundColor: theme.colors.background},
          ]}>
          <EmptyList text="Sem eventos nesse dia" />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    minHeight: 40,
    padding: 16,
    marginVertical: 4,
  },
  itemText: {
    color: '#888',
    fontSize: 16,
  },
  emptyData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listAgenda: {
    backgroundColor: 'red',
  },
});

export default EventListScreen;
