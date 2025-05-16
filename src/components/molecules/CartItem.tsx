import React, { FC, memo } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import QuantitySelector from '../atoms/QuantitySelector';
import { CartItem as CartItemTypes } from '../../types/cartTypes';
import Text from '../atoms/Text';

interface CartItemProps {
  item: CartItemTypes;
  onQuantityChange: (quantity: number) => void;
}

const CartItem: FC<CartItemProps> = memo(({ item, onQuantityChange }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.details}>
        <Text variant="bold" style={styles.title}>
          {item.brand}
        </Text>
        <Text style={styles.productName}>{item.title}</Text>
        <View style={styles.contain}>
          <Text variant="bold" style={styles.price}>
            ${item.price.toFixed(2)}
          </Text>
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => onQuantityChange(item.quantity + 1)}
            onDecrease={() => onQuantityChange(item.quantity - 1)}
          />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E8E9',
  },
  contain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: '#E7E8E9',
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  productName: {
    fontSize: 12,
    color: '#797979',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E7E8E9',
    marginTop: 8,
  },
  removeButtonText: {
    color: '#E7E8E9',
  },
});

export default CartItem;
