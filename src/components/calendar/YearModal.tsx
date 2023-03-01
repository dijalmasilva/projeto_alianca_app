import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {createRef, useEffect} from 'react';
import useTheme from 'theme/useTheme';
import {getYear} from 'date-fns/esm';

type Props = {
  year: number;
  showModal: boolean;
  onChange?: (year: number) => void;
  onCloseModal: () => void;
};

const yearOfToday = getYear(new Date());
const arr = Array.from({length: 101}, (value, index) => yearOfToday - index);

const YearModal = ({year, showModal, onCloseModal, onChange}: Props) => {
  const ref = createRef<any>();
  const theme = useTheme();

  const onSelectYear = (yearSelected: number) => {
    onChange && onChange(yearSelected);
    onCloseModal();
  };

  useEffect(() => {
    if (ref.current) {
      setTimeout(() => {
        ref.current.scrollToIndex({index: yearOfToday - year}, {smooth: true});
      }, 300);
    }
  }, [ref]);

  const getItemLayout = (_: any, index: number) => {
    return {
      length: styles.itemList.height,
      offset: styles.itemList.height * index,
      index,
    };
  };

  return (
    <Modal visible={showModal}>
      <SafeAreaView>
        <FlatList
          ref={ref}
          data={arr}
          keyExtractor={item => `${item}`}
          getItemLayout={getItemLayout}
          renderItem={item => (
            <TouchableOpacity
              style={[
                {
                  backgroundColor:
                    item.item === year
                      ? theme.colors.border
                      : theme.colors.card,
                },
                styles.itemList,
              ]}
              key={`${item.index}`}
              onPress={() => onSelectYear(item.item)}>
              <Text
                style={[
                  {color: theme.colors.text},
                  styles.itemListText,
                ]}>{`${item.item}`}</Text>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  itemList: {
    height: 60,
    justifyContent: 'center',
  },
  itemListSelected: {
    backgroundColor: 'rgba(142,142,142,0.33)',
  },
  itemListText: {
    textAlign: 'center',
    fontSize: 24,
  },
});

export default YearModal;
