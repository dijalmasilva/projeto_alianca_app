import {Calendar, CalendarProps} from 'react-native-calendars';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import useTheme from 'theme/useTheme';
import React, {useEffect, useState} from 'react';
import {
  addMonths,
  format,
  getYear,
  parse,
  setYear,
  subMonths,
} from 'date-fns/esm';
import YearModal from '@/components/calendar/YearModal';
import {DATE_FORMATS, runConfigDate} from './calendar.config';

runConfigDate();

type Props = CalendarProps & {
  onSelect: (date: string) => void;
};

const CalendarBirthday = ({onSelect, ...props}: Props) => {
  const [showYearModal, setShowYearModal] = useState(false);
  const [currentAsData, setCurrentAsData] = useState(new Date());
  const [markedData, setMarkedData] = useState(new Date());

  const currentFormatted = format(currentAsData, DATE_FORMATS.calendar);
  const markedDataFormatted = format(markedData, DATE_FORMATS.calendar);

  const onChangeYear = (year: number) => {
    setCurrentAsData(prev => setYear(prev, year));
  };

  useEffect(() => {
    onSelect(markedDataFormatted);
  }, [markedDataFormatted]);

  const theme = useTheme();
  return (
    <>
      <Calendar
        {...props}
        key={currentFormatted}
        current={currentFormatted}
        markingType="custom"
        markedDates={{
          [markedDataFormatted]: {
            customStyles: {
              container: {
                backgroundColor: theme.colors.primary,
              },
              text: {
                color: theme.colors.text,
              },
            },
          },
        }}
        customHeaderTitle={
          <TouchableOpacity onPress={() => setShowYearModal(true)}>
            <Text>{format(currentAsData, DATE_FORMATS.title)}</Text>
          </TouchableOpacity>
        }
        style={styles.calendar}
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
        onPressArrowLeft={() => {
          setCurrentAsData(prev => subMonths(prev, 1));
        }}
        onPressArrowRight={() => {
          setCurrentAsData(prev => addMonths(prev, 1));
        }}
        onDayPress={date => {
          if (date) {
            setMarkedData(
              parse(date.dateString, DATE_FORMATS.calendar, markedData),
            );
          }
        }}
      />
      <YearModal
        year={getYear(currentAsData)}
        showModal={showYearModal}
        onChange={onChangeYear}
        onCloseModal={() => setShowYearModal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 8,
  },
});

export default CalendarBirthday;
