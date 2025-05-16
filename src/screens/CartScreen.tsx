import React, { FC, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import CartTemplate from '../components/templates/CartTemplate';
import { updateQuantity, removeFromCart } from '../store/cartSlice';

const CartScreen: FC = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const orderSummary = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const shipping = items.length > 0 ? 10 : 0; // $10 flat shipping
    const total = subtotal + shipping;
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);

    return { subtotal, shipping, total, itemCount };
  }, [items]);

  const handleQuantityChange = useCallback(
    (id: number, quantity: number) => {
      if (quantity < 0) {
        dispatch(removeFromCart(id));
      } else {
        dispatch(updateQuantity({ id, quantity }));
      }
    },
    [dispatch],
  );

  return (
    <CartTemplate
      items={items}
      summary={orderSummary}
      onQuantityChange={handleQuantityChange}
    />
  );
};

export default CartScreen;
