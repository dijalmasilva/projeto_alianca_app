import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Theme} from '@react-navigation/native';
import useTheme from 'theme/useTheme';
import useUserInput, {
  MiminalPerson,
  MultiSelect,
  SingleSelect,
} from './hooks/useUserInput';
import NotchLoading from '@/components/loading/notch-loading';

type Props = {
  multipleSelection?: boolean;
  onSingleSelect?: SingleSelect;
  onMultiSelect?: MultiSelect;
  defaultSingleValue?: number;
  defaultMultiValue?: number[];
  label: string;
  editable?: boolean;
};

type UserChipsProps = {
  persons: MiminalPerson[];
  theme: Theme;
  onRemove: (personId: number) => void;
  canRemove?: boolean;
};
const UserChips = ({
  persons,
  theme,
  onRemove,
  canRemove = true,
}: UserChipsProps) => {
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
            {canRemove && (
              <TouchableOpacity onPress={() => onRemove(person.id)}>
                <Icon color={theme.colors.text} name="trash" size={20} />
              </TouchableOpacity>
            )}
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
  defaultSingleValue,
  defaultMultiValue,
  editable = true,
}: Props) => {
  const theme = useTheme();

  const {
    name,
    setName,
    person,
    setPerson,
    persons,
    setPersons,
    personsResult,
    setPersonsResult,
    loading,
  } = useUserInput(
    multipleSelection,
    onSingleSelect,
    onMultiSelect,
    defaultSingleValue,
    defaultMultiValue,
  );

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
      {loading && (
        <View style={styles.viewLoading}>
          <NotchLoading size={30} />
        </View>
      )}
      {!loading && (
        <View style={[styles.inputView, {backgroundColor: theme.colors.card}]}>
          {!multipleSelection && !person && editable && textInput}
          {!multipleSelection && person && (
            <UserChips
              persons={[person]}
              theme={theme}
              onRemove={() => setPerson(undefined)}
              canRemove={editable}
            />
          )}
          {multipleSelection && (
            <>
              {persons.length > 0 && (
                <UserChips
                  persons={persons}
                  theme={theme}
                  onRemove={personId => {
                    setPersons(prevState => {
                      return prevState.filter(p => p.id !== personId);
                    });
                  }}
                  canRemove={editable}
                />
              )}
              {editable && textInput}
            </>
          )}
          <View>
            {personsResult.map((item, index) => {
              const personToAdd = {
                id: item.id,
                name: item.name,
              } as MiminalPerson;
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
      )}
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
  viewLoading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default UserInput;
