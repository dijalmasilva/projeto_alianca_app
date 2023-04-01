import {
  Alert,
  Dimensions,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useTheme from 'theme/useTheme';
import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import ChurchService from 'store/features/church/church-service';
import PersonSelectors from 'store/features/person/selectors';
import ChurchSelectors from 'store/features/church/selectors';
import {Church} from '@prisma/client';
import ChurchList from '@/components/churchs/church-list';

type Props = {
  onSelect: (value: Church) => void;
  selected?: number;
  placeholder: string;
};

const SelectChurchModal = ({onSelect, placeholder, selected}: Props) => {
  const token = useAppSelector(PersonSelectors.accessToken);
  const churchs = useAppSelector(ChurchSelectors.getChurchs);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [isVisible, setVisible] = useState(false);

  const onSelectItem = (item: Church) => {
    onSelect(item);
    setVisible(false);
  };

  const toggleModal = () => {
    if (churchs.length > 0) {
      setVisible(prev => !prev);
    } else {
      Alert.alert('Não há igrejas cadastradas');
      dispatch(ChurchService.getChurchs(token));
    }
  };

  useEffect(() => {
    dispatch(ChurchService.getChurchs(token));
  }, []);

  return (
    <>
      <TouchableOpacity
        style={[styles.select, {backgroundColor: theme.colors.card}]}
        onPress={toggleModal}>
        {!selected && (
          <Text style={[{color: theme.colors.text}, styles.placeholder]}>
            {placeholder}
          </Text>
        )}
        {selected && (
          <Text style={[{color: theme.colors.text}, styles.textSelected]}>
            {churchs.find(c => c.id === selected)?.name}
          </Text>
        )}
      </TouchableOpacity>
      <Modal visible={isVisible} animationType="slide">
        <SafeAreaView
          style={{
            backgroundColor: theme.colors.card,
            height: Dimensions.get('screen').height,
          }}>
          <ChurchList churchs={churchs} onSelectChurch={onSelectItem} />
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  select: {
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  placeholder: {
    textTransform: 'uppercase',
  },
  textSelected: {
    fontWeight: 'bold',
  },
});

export default SelectChurchModal;
