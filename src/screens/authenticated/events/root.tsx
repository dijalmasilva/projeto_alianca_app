import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EventCreateScreen from '@/screens/authenticated/events/create';
import EventDetailsScreen from '@/screens/authenticated/events/details';
import EventListScreen from '@/screens/authenticated/events/list';

const EventNavigator = createNativeStackNavigator();

export enum EventRoutes {
  list = 'eventList',
  create = 'eventCreate',
  details = 'eventDetails',
}

const EventRootScreen = () => {
  return (
    <EventNavigator.Navigator initialRouteName={EventRoutes.list}>
      <EventNavigator.Screen
        name={EventRoutes.list}
        component={EventListScreen}
        options={{title: 'Eventos'}}
      />
      <EventNavigator.Screen
        name={EventRoutes.create}
        component={EventCreateScreen}
        options={{title: 'Criar evento'}}
      />
      <EventNavigator.Screen
        name={EventRoutes.details}
        component={EventDetailsScreen}
      />
    </EventNavigator.Navigator>
  );
};

export default EventRootScreen;
