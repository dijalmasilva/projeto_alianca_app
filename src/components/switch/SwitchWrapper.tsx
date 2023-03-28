import React, {useEffect, useState} from 'react';
import {Switch} from 'react-native';
import useTheme from 'theme/useTheme';

type Props = {
  onChange?: (value: boolean) => void;
  defaultValue?: boolean;
};

const SwitchWrapper = ({onChange, defaultValue = false}: Props) => {
  const theme = useTheme();
  const [isEnabled, setIsEnabled] = useState(defaultValue);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    onChange && onChange(isEnabled);
  }, [isEnabled]);

  return (
    <Switch
      trackColor={{false: '#767577', true: theme.colors.primary}}
      thumbColor={isEnabled ? theme.colors.text : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
};

export default SwitchWrapper;
