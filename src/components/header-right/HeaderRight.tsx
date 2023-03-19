import React, {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '@/hooks/store-hook';
import PersonSelectors from 'store/features/person/selectors';
import Avatar from '@/components/avatar/Avatar';
import PersonService from 'store/features/person/person-service';

const HeaderRight = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(PersonSelectors.accessToken);
  const profile = useAppSelector(PersonSelectors.profile);

  useEffect(() => {
    if (!profile.id) {
      dispatch(PersonService.getProfile(token));
    }
  }, []);

  const onPress = () => {
    //TODO open drawer
  };

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Avatar name={profile.name} size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRight;
