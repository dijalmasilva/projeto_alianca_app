import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Agenda} from 'react-native-calendars';
import useTheme from 'theme/useTheme';
import {DATE_FORMATS} from '@/components/calendar/calendar.config';
import ViewContainer from '@/components/container/ViewContainer';
import {addDays, format, isSameDay, subDays} from 'date-fns';

const AgendaScreen = () => {
  const today = new Date();
  const theme = useTheme();

  const testItems = {
    [format(today, DATE_FORMATS.calendar)]: [
      {
        name: 'Pré encontro com Deus',
        height: 10,
        day: '',
      },
      {
        name: 'Força Jovem',
        height: 10,
        day: '',
      },
    ],
    [format(addDays(today, 1), DATE_FORMATS.calendar)]: [
      {
        name: 'Culto ao Espírito Santo',
        height: 10,
        day: '',
      },
      {
        name: 'Cantina dos jovens',
        height: 10,
        day: '',
      },
      {
        name: 'Alguma coisa',
        height: 10,
        day: '',
      },
    ],
  };

  return (
    <Agenda
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
      items={testItems}
      initialNumToRender={5}
      minDate={format(subDays(today, 15), DATE_FORMATS.calendar)}
      maxDate={format(addDays(today, 40), DATE_FORMATS.calendar)}
      selected={format(today, DATE_FORMATS.calendar)}
      renderItem={item => {
        return (
          <View
            key={item.name}
            style={[styles.item, {backgroundColor: theme.colors.primary}]}>
            <Text>{item.name}</Text>
          </View>
        );
      }}
      renderList={props => {
        const {selectedDay} = props;
        const selected = new Date(selectedDay);
        const items = props.items;
        let events;
        if (items) {
          const keys = Object.keys(items);
          const keyFound = keys.find(key => {
            //for some reason new Date(key) subtracts one day, for this reason I increment one day
            const dateKey = addDays(new Date(key), 1);
            return isSameDay(dateKey, selected);
          });

          if (keyFound) {
            events = items[keyFound as string];
          }
        }

        return (
          <ViewContainer>
            <>
              {!events && props.renderEmptyData && props.renderEmptyData()}
              {events &&
                events.map(
                  (event, index) =>
                    props.renderItem && props.renderItem(event, index === 0),
                )}
            </>
          </ViewContainer>
        );
      }}
      renderEmptyData={() => (
        <View
          style={[
            styles.emptyData,
            {backgroundColor: theme.colors.background},
          ]}>
          <Text>Não há eventos para este dia</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AgendaScreen;
