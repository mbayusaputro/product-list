import React, { FC, memo } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import Text from './Text';
import Icon from 'react-native-vector-icons/Ionicons';

interface ButtonProps {
  title: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: string;
}

const Button: FC<ButtonProps> = memo(
  ({ title, onPress, style, textStyle, disabled = false, icon }) => {
    return (
      <TouchableOpacity
        style={[styles.button, style, disabled && styles.disabled]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}>
        {icon && (
          <Icon name={icon} size={18} color="#FFFFFF" style={styles.icon} />
        )}
        <Text
          variant="semiBold"
          style={{
            ...styles.buttonText,
            ...textStyle,
            ...styles.text,
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    height: 50,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    marginTop: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;
