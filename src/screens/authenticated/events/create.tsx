import React from 'react';
import ViewContainer from '@/components/container/ViewContainer';
import useCreateEvent from '@/screens/authenticated/events/hooks/useCreateEvent';
import {NavigationProp} from '@react-navigation/native';
import Input from '@/components/input/Input';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Button from '@/components/button/Button';
import SwitchWrapper from '@/components/switch/SwitchWrapper';
import UserInput from '@/components/input/UserInput';
import {Calendar} from 'react-native-calendars';

type Props = {
  navigation: NavigationProp<any>;
};

const EventCreateScreen = ({navigation}: Props) => {
  const {
    onSubmit,
    setEventName,
    setEventDescription,
    setEventDepartmentId,
    setEventIsWorship,
    setEventInitiationId,
    setEventObservations,
    setEventOffertoryId,
    setEventPreacherId,
    setEventStartTime,
    setEventFinishTime,
    loading,
    isWorship,
  } = useCreateEvent(navigation);

  return (
    <ScrollView>
      <ViewContainer style={styles.viewContainer}>
        <View style={styles.switch}>
          <Text style={styles.label}>É um culto?</Text>
          <SwitchWrapper onChange={setEventIsWorship} />
        </View>
        <Input label="Nome do Evento" onChangeText={setEventName} />
        <Input
          label="Descrição"
          onChangeText={setEventDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        <Input
          label="Observações"
          onChangeText={setEventObservations}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
        {isWorship && (
          <>
            <UserInput label="Abertura" onSingleSelect={setEventInitiationId} />
            <UserInput label="Ofertório" onSingleSelect={setEventOffertoryId} />
            <UserInput label="Pregador" onSingleSelect={setEventPreacherId} />
          </>
        )}
        <Input
          label="Departamento responsável"
          onChangeText={() => setEventDepartmentId(null)}
        />
        <Calendar
          label="Início"
          onDayPress={date => setEventStartTime(new Date(date.dateString))}
        />
        <Calendar
          label="Fim"
          onDayPress={date => setEventFinishTime(new Date(date.dateString))}
        />
        <Button onPress={onSubmit} loading={loading}>
          <Text>CADASTRAR</Text>
        </Button>
      </ViewContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    gap: 8,
  },
  switch: {
    gap: 8,
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default EventCreateScreen;
