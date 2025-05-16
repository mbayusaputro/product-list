import React, { FC, memo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Text from './Text';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantitySelector: FC<QuantitySelectorProps> = memo(
  ({ quantity, onIncrease, onDecrease }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onDecrease} style={styles.button}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={onIncrease} style={styles.button}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
    padding: 4,
  },
  button: {
    width: 20,
    alignItems: 'center',
  },
  quantity: {
    paddingHorizontal: 10,
  },
});

export default QuantitySelector;
