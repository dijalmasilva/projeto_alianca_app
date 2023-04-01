import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import {useState} from 'react';
import DepartmentService from 'store/features/department/department-service';
import {Alert} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import DepartmentCreateDto from 'models/department/deparment-create.dto';

const useCreateDepartment = (navigation: NavigationProp<any>) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(PersonSelectors.accessToken);
  const [departmentState, setDepartmentState] = useState<DepartmentCreateDto>({
    name: '',
    description: '',
    leaderId: 0,
    churchId: 1,
    members: [],
  });
  const onChangeDepartment = (key: string, value: any) => {
    setDepartmentState(prevState => ({...prevState, [key]: value}));
  };

  const onChangeName = (text: string) => onChangeDepartment('name', text);
  const onChangeDescription = (text: string) =>
    onChangeDepartment('description', text);

  const onChangeLeader = (leaderId: number) =>
    onChangeDepartment('leaderId', leaderId);

  const onChangeMembers = (newMembers: number[]) =>
    onChangeDepartment('members', newMembers);

  const onSubmit = async () => {
    const resultCreate = await dispatch(
      DepartmentService.createDepartment({
        token,
        department: departmentState,
      }),
    );

    if (DepartmentService.createDepartment.fulfilled.match(resultCreate)) {
      navigation.goBack();
    } else {
      Alert.alert('Houve um erro ao cadastrar o departamento');
    }
  };

  return {
    departmentState,
    onChangeName,
    onChangeDescription,
    onChangeLeader,
    onChangeMembers,
    onSubmit,
  };
};

export default useCreateDepartment;
