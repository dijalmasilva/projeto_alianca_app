import React from 'react';
import {Departament} from '@prisma/client';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import useTheme from 'theme/useTheme';

type Props = {
  // Define Props type for DepartamentSummary
  department: Departament;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const DepartamentSummary: React.FC<Props> = ({department, style, onPress}) => {
  return (
    <TouchableOpacity
      style={[stylesSummary.container, style]}
      onPress={onPress}>
      <View style={stylesSummary.iconContainer}>
        <Icon name="users" size={20} />
        {/* Use the FontAwesome users icon */}
      </View>
      <View style={stylesSummary.textContainer}>
        <Text style={stylesSummary.name}>{department.name}</Text>
        <Text style={stylesSummary.description}>{department.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const stylesSummary = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  iconContainer: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
});

interface ListProps {
  // Define Props type for DepartamentList
  departaments: Departament[];
  onSelect?: (departament: Departament) => void;
}

const DepartamentList: React.FC<ListProps> = ({departaments, onSelect}) => {
  const theme = useTheme();
  const isEmpty = departaments.length === 0;

  if (isEmpty) {
    return (
      <View style={styles.emptyContainer}>
        <EntypoIcon name="text-document" size={25} />
        <Text>Lista vazia</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      {departaments.map((department, index) => (
        <DepartamentSummary
          key={department.id}
          department={department}
          onPress={() => onSelect && onSelect(department)}
          style={{
            backgroundColor:
              index % 2 ? theme.colors.card : theme.colors.border,
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 8,
  },
});

export default DepartamentList;
