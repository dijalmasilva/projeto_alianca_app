import {NavigationProp} from '@react-navigation/native';
import {useState} from 'react';
import {addDays, format} from 'date-fns';
import {DATE_FORMATS} from '@/components/calendar/calendar.config';
import {EventRoutes} from '@/screens/authenticated/events/root';

// const testItems = {
//   [format(today, DATE_FORMATS.calendar)]: [
//     {
//       name: 'Pré encontro com Deus',
//       height: 10,
//       day: '',
//     },
//     {
//       name: 'Força Jovem',
//       height: 10,
//       day: '',
//     },
//   ],
//   [format(addDays(today, 1), DATE_FORMATS.calendar)]: [
//     {
//       name: 'Culto ao Espírito Santo',
//       height: 10,
//       day: '',
//     },
//     {
//       name: 'Cantina dos jovens',
//       height: 10,
//       day: '',
//     },
//     {
//       name: 'Alguma coisa',
//       height: 10,
//       day: '',
//     },
//   ],
// };

const useListEvents = (navigation: NavigationProp<any>) => {
  const today = new Date();
  const [refreshing, setRefreshing] = useState(false);
  const [events] = useState({
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
    [format(addDays(today, 15), DATE_FORMATS.calendar)]: [
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
  });

  const createEvent = () => {
    navigation.navigate(EventRoutes.create);
  };

  const loadEventsByDay = async (day: string) => {
    setRefreshing(true);
    console.log('loading events by day: ', day);
    setRefreshing(false);
    return;
  };

  return {
    refreshing,
    events,
    loadEventsByDay,
    createEvent,
  };
};

export default useListEvents;
