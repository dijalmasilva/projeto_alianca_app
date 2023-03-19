import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Agenda} from 'react-native-calendars';
import useTheme from 'theme/useTheme';
import {format} from 'date-fns/esm';
import {DATE_FORMATS} from '@/components/calendar/calendar.config';

const AgendaScreen = () => {
  const theme = useTheme();

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
      selected={format(new Date(), DATE_FORMATS.calendar)}
      renderItem={item => (
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
      )}
      renderList={props => {
        const {selectedDay} = props;

        return (
          <View
            style={[
              styles.viewList,
              {backgroundColor: theme.colors.background},
            ]}>
            <Text>List</Text>
            {!props.items && props.renderEmptyData && props.renderEmptyData()}
          </View>
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
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
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
  viewList: {
    flex: 1,
  },
});

export default AgendaScreen;
