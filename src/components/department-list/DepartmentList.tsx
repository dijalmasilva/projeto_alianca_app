import React from 'react';
import {Department} from '@prisma/client';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useTheme from 'theme/useTheme';
import EmptyList from '@/components/empty-list/EmptyList';

type Props = {
  // Define Props type for DepartmentSummary
  department: Department;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const DepartmentSummary: React.FC<Props> = ({department, style, onPress}) => {
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
  // Define Props type for DepartmentList
  departments: Department[];
  onSelect?: (department: Department) => void;
}

const DepartmentList: React.FC<ListProps> = ({departments, onSelect}) => {
  const theme = useTheme();
  const isEmpty = departments.length === 0;

  if (isEmpty) {
    return <EmptyList text="Lista vazia" />;
  }

  return (
    <View style={styles.listContainer}>
      {departments.map((department, index) => (
        <DepartmentSummary
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
});

export default DepartmentList;
