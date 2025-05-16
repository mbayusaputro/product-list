import React, { FC, memo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import CartItem from '../molecules/CartItem';
import { CartItem as CartItemType } from '../../types/cartTypes';

interface CartListProps {
  items: CartItemType[];
  onQuantityChange: (id: number, newQuantity: number) => void;
}

const CartList: FC<CartListProps> = memo(({ items, onQuantityChange }) => {
  const renderItem = ({ item }: { item: CartItemType }) => (
    <CartItem
      item={item}
      onQuantityChange={n => onQuantityChange(item.id, n)}
    />
  );

  const keyExtractor = (item: CartItemType) => item.id.toString();

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});

export default CartList;
