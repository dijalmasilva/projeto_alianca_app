import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Theme} from '@react-navigation/native';
import useTheme from 'theme/useTheme';
import {Person} from '@prisma/client';
import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import PersonService from 'store/features/person/person-service';

type SingleSelect = (person: number) => void;
type MultiSelect = (persons: number[]) => void;

type Props = {
  multipleSelection?: boolean;
  onSingleSelect?: SingleSelect;
  onMultiSelect?: MultiSelect;
  label: string;
};

type MiminalPerson = {
  id: number;
  name: string;
};

type UserChipsProps = {
  persons: MiminalPerson[];
  theme: Theme;
  onRemove: (personId: number) => void;
};
const UserChips = ({persons, theme, onRemove}: UserChipsProps) => {
  return (
    <View style={chipsStyles.chipView}>
      {persons.map(person => {
        return (
          <View
            key={person.id}
            style={[
              chipsStyles.chipItem,
              {backgroundColor: theme.colors.primary},
            ]}>
            <Text style={{color: theme.colors.text}}>{person.name}</Text>
            <TouchableOpacity onPress={() => onRemove(person.id)}>
              <Icon color={theme.colors.text} name="trash" size={20} />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const chipsStyles = StyleSheet.create({
  chipView: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  chipItem: {
    padding: 8,
    borderRadius: 8,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const UserInput = ({
  multipleSelection = false,
  onSingleSelect,
  onMultiSelect,
  label,
}: Props) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(PersonSelectors.accessToken);
  const [person, setPerson] = useState<MiminalPerson | undefined>(undefined);
  const [persons, setPersons] = useState<MiminalPerson[]>([]);
  const [name, setName] = useState<string>('');
  const [personsResult, setPersonsResult] = useState<Person[]>([]);
  const theme = useTheme();

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

  const textInput = (
    <TextInput
      defaultValue={name}
      onChangeText={setName}
      placeholderTextColor={theme.colors.text}
      style={[{backgroundColor: theme.colors.card}, styles.input]}
    />
  );

  return (
    <View>
      <Text style={styles.label}>{label}:</Text>
      <View style={[styles.inputView, {backgroundColor: theme.colors.card}]}>
        {!multipleSelection && !person && textInput}
        {!multipleSelection && person && (
          <UserChips
            persons={[person]}
            theme={theme}
            onRemove={() => setPerson(undefined)}
          />
        )}
        {multipleSelection && (
          <>
            {persons.length > 0 && (
              <UserChips
                persons={persons}
                theme={theme}
                onRemove={personId => {
                  setPersons(prevState =>
                    prevState.filter(p => personId !== p.id),
                  );
                }}
              />
            )}
            {textInput}
          </>
        )}
        <View>
          {personsResult.map((item, index) => {
            const personToAdd = {id: item.id, name: item.name} as MiminalPerson;
            return (
              <View
                key={index}
                style={[
                  styles.itemListPersons,
                  {
                    backgroundColor:
                      index % 2 ? theme.colors.card : theme.colors.border,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    if (!multipleSelection) {
                      setPerson(personToAdd);
                      setPersonsResult([]);
                      setPersons([]);
                      setName('');
                    } else {
                      setPersons(prevState =>
                        prevState
                          .filter(p => p.id !== item.id)
                          .concat([personToAdd]),
                      );
                      setPerson(undefined);
                    }
                  }}>
                  <Text>
                    {item.name} - {item.phoneNumber}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'column',
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    marginLeft: 8,
    marginVertical: 8,
    fontWeight: 'bold',
  },
  listPersons: {
    gap: 4,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
  },
  itemListPersons: {
    padding: 16,
  },
  input: {
    padding: 16,
    borderRadius: 8,
  },
});

export default UserInput;
