import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import React, {useEffect, useState} from 'react';
import {Person} from '@prisma/client';
import PersonService from 'store/features/person/person-service';
import {Alert} from 'react-native';

export type SingleSelect = (person: number) => void;
export type MultiSelect = (persons: number[]) => void;

export type MiminalPerson = {
  id: number;
  name: string;
};

type UserInputHookType = (
  multipleSelection?: boolean,
  onSingleSelect?: SingleSelect,
  onMultiSelect?: MultiSelect,
  defaultSingleValue?: number,
  defaultMultiValue?: number[],
) => {
  name: string;
  setName: (name: string) => void;
  personsResult: Person[];
  person: MiminalPerson | undefined;
  persons: MiminalPerson[];
  setPerson: React.Dispatch<React.SetStateAction<MiminalPerson | undefined>>;
  setPersons: React.Dispatch<React.SetStateAction<MiminalPerson[]>>;
  setPersonsResult: React.Dispatch<React.SetStateAction<Person[]>>;
  loading: boolean;
};

const useUserInput: UserInputHookType = (
  multipleSelection,
  onSingleSelect,
  onMultiSelect,
  defaultSingleValue,
  defaultMultiValue,
) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(PersonSelectors.accessToken);
  const [person, setPerson] = useState<MiminalPerson | undefined>(undefined);
  const [persons, setPersons] = useState<MiminalPerson[]>([]);
  const [name, setName] = useState<string>('');
  const [personsResult, setPersonsResult] = useState<Person[]>([]);

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!multipleSelection && person && onSingleSelect) {
      onSingleSelect(person.id);
    }
  }, [multipleSelection, person]);

  useEffect(() => {
    if (multipleSelection && persons.length > 0 && onMultiSelect) {
      onMultiSelect(persons.map(p => p.id));
    }
  }, [multipleSelection, persons]);

  const loadSinglePerson = async () => {
    setPersons([]);
    const result = await dispatch(
      PersonService.getPersonsByQuery({
        token,
        query: {
          where: {
            id: defaultSingleValue,
          },
          select: {
            id: true,
            name: true,
          },
        },
      }),
    );

    if (PersonService.getPersonsByQuery.fulfilled.match(result)) {
      const data = result.payload;
      console.log(`getSinglePerson: ${JSON.stringify(data, null, 2)} `);
      setPerson(data[0]);
    }
  };

  const loadMultiPersons = async () => {
    const result = await dispatch(
      PersonService.getPersonsByQuery({
        token,
        query: {
          where: {
            OR: defaultMultiValue?.map(id => ({id})),
          },
          select: {
            id: true,
            name: true,
          },
        },
      }),
    );

    if (PersonService.getPersonsByQuery.fulfilled.match(result)) {
      const data = result.payload;
      console.log(`getMultiPersons: ${JSON.stringify(data, null, 2)} `);
      setPersons(data);
    }
  };

  useEffect(() => {
    if (!loaded) {
      if (!multipleSelection && defaultSingleValue) {
        loadSinglePerson().then(() => setLoaded(true));
        return;
      }

      if (
        multipleSelection &&
        defaultMultiValue &&
        defaultMultiValue.length > 0
      ) {
        loadMultiPersons().then(() => setLoaded(true));
      }
    }
  }, [defaultSingleValue, defaultMultiValue, loaded]);

  useEffect(() => {
    (async () => {
      if (name.length >= 3) {
        const result = await dispatch(
          PersonService.getPersonByNameOrNumber({token, filter: name}),
        );
        if (PersonService.getPersonByNameOrNumber.fulfilled.match(result)) {
          const data = result.payload;
          setPersonsResult(data);
        } else {
          Alert.alert('Houve um erro ao buscar os usuários');
        }
      } else {
        setPersonsResult([]);
      }
    })();
  }, [name]);

  return {
    name,
    setName,
    person,
    setPerson,
    persons,
    setPersons,
    personsResult,
    setPersonsResult,
    loading: !loaded,
  };
};

export default useUserInput;
