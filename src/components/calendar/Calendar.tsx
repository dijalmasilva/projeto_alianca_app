import {Calendar, CalendarProps, LocaleConfig} from 'react-native-calendars';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import useTheme from 'theme/useTheme';
import React, {useState} from 'react';
import {ptBR} from 'date-fns/locale';
import {
  setDefaultOptions,
  format,
  getYear,
  subMonths,
  setYear,
  addMonths,
  toDate,
} from 'date-fns/esm';
import YearModal from '@/components/calendar/YearModal';

setDefaultOptions({locale: ptBR});

LocaleConfig.locales.pt_BR = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov.',
    'Dez',
  ],
  dayNames: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'pt_BR';

export const FORMAT_CALENDAR = 'yyyy-MM-dd';
const FORMAT_TITLE = "MMMM'/'yyyy";

const CalendarWrapper = (props: CalendarProps) => {
  const [showYearModal, setShowYearModal] = useState(false);
  const [currentAsData, setCurrentAsData] = useState(new Date());

  const currentFormatted = format(currentAsData, FORMAT_CALENDAR);

  const onChangeYear = (year: number) => {
    setCurrentAsData(prev => setYear(prev, year));
  };

  const theme = useTheme();
  return (
    <>
      <Calendar
        {...props}
        key={currentFormatted}
        current={currentFormatted}
        customHeaderTitle={
          <TouchableOpacity onPress={() => setShowYearModal(true)}>
            <Text>{format(currentAsData, FORMAT_TITLE)}</Text>
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
        onPress={date => {
          if (date) {
            setCurrentAsData(toDate(date.timestamp));
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

export default CalendarWrapper;
