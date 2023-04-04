import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import EventSelectors from 'store/features/event/selectors';
import {useState} from 'react';
import EventCreateDto from 'models/event/event-create.dto';
import {Alert} from 'react-native';
import PersonSelectors from 'store/features/person/selectors';
import EventService from 'store/features/event/event-service';
import {NavigationProp} from '@react-navigation/native';
import {EventRoutes} from '@/screens/authenticated/events/root';

const useCreateEvent = (navigation: NavigationProp<any>) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(PersonSelectors.accessToken);
  const loading = useAppSelector(EventSelectors.getLoading);
  const [eventState, setEventState] = useState<EventCreateDto>({
    name: '',
    description: '',
    departmentId: null,
    churchId: 1,
    startTime: new Date(),
    finishTime: new Date(),
    initiationId: null,
    isWorship: false,
    observations: '',
    offertoryId: null,
    preacherId: null,
  });

  const setEvent = (key: string, value: any) => {
    setEventState(prevState => ({...prevState, [key]: value}));
  };

  const setEventName = (name: string) => setEvent('name', name);
  const setEventDescription = (description: string) =>
    setEvent('description', description);
  const setEventDepartmentId = (departmentId: number | null) =>
    setEvent('departmentId', departmentId);
  const setEventStartTime = (startTime: Date) =>
    setEvent('startTime', startTime);
  const setEventFinishTime = (finishTime: Date) =>
    setEvent('finishTime', finishTime);
  const setEventInitiationId = (initiationId: number | null) =>
    setEvent('initiationId', initiationId);
  const setEventIsWorship = (isWorship: boolean) => {
    setEvent('isWorship', isWorship);
    setEvent('initiationId', null);
    setEvent('offertoryId', null);
    setEvent('preacherId', null);
  };
  const setEventObservations = (observations: string) =>
    setEvent('observations', observations);
  const setEventOffertoryId = (offertoryId: number | null) =>
    setEvent('offertoryId', offertoryId);
  const setEventPreacherId = (preacherId: number | null) =>
    setEvent('preacherId', preacherId);

  const validateEvent = () => {
    if (!eventState.name) {
      Alert.alert('Nome do evento é obrigatório');
      return false;
    }

    if (!eventState.startTime) {
      Alert.alert('Data de início do evento é obrigatório');
      return false;
    }

    if (!eventState.finishTime) {
      Alert.alert('Data de término do evento é obrigatório');
      return false;
    }

    if (eventState.isWorship) {
      if (!eventState.initiationId) {
        Alert.alert(
          'Para evento do tipo culto, é necessário selecionar alguém para a abertura!',
        );
        return false;
      }
      if (!eventState.offertoryId) {
        Alert.alert(
          'Para evento do tipo culto, é necessário selecionar alguém para o ofertório!',
        );
        return false;
      }
      if (!eventState.preacherId) {
        Alert.alert(
          'Para evento do tipo culto, é necessário selecionar alguém para ser o pregador!',
        );
        return false;
      }
    }

    return true;
  };

  const onSubmit = async () => {
    if (validateEvent()) {
      const result = await dispatch(
        EventService.createEvent({token, event: eventState}),
      );

      if (EventService.createEvent.rejected.match(result)) {
        Alert.alert('Não foi possível criar o evento');
      } else {
        navigation.goBack();
      }
    }
  };

  return {
    loading,
    setEventName,
    setEventDescription,
    setEventDepartmentId,
    setEventStartTime,
    setEventFinishTime,
    setEventInitiationId,
    setEventIsWorship,
    setEventObservations,
    setEventOffertoryId,
    setEventPreacherId,
    isWorship: eventState.isWorship,
    onSubmit,
  };
};

export default useCreateEvent;
