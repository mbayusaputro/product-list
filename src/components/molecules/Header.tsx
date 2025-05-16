import React, { FC, memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../atoms/Text';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  icon?: string; // or use react-native-vector-icons
  title: string;
  onPress?: () => void;
}

const Header: FC<HeaderProps> = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon && <Icon name={icon} size={24} />}
      <Text variant="bold" style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  text: {
    marginLeft: 10,
    marginTop: 3,
    fontSize: 22,
  },
});

export default memo(Header);
