import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  CartScreenNavigationProp,
  ProductDetailScreenProps,
} from '../navigation/types';
import { updateProduct } from '../store/productSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addToCart } from '../store/cartSlice';
import { useNavigation } from '@react-navigation/native';
import ProductDetailTemplate from '../components/templates/ProductDetailTemplate';

const ProductDetailScreen: FC<ProductDetailScreenProps> = ({ route }) => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { product } = route.params;
  const [isStock, setStock] = useState<number>(1);
  const [isShow, setShow] = useState<boolean>(false);
  const [isLike, setLike] = useState<boolean>(false);
  const maxStock = (product.stock * 50) / 100;

  useEffect(() => {
    setLike(product.favorite);
  }, [product.favorite]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onLike = useCallback(() => {
    dispatch(updateProduct(product.id));
    setLike(prev => !prev);
  }, [dispatch, product.id]);

  const onUpdateQuantity = useCallback(
    (str: string) => {
      if (str === '+') {
        setStock(prev => (prev < maxStock ? prev + 1 : prev));
      } else {
        setStock(prev => (prev > 1 ? prev - 1 : prev));
      }
    },
    [maxStock],
  );

  const onAddCart = useCallback(() => {
    dispatch(addToCart({ product, quantity: isStock }));
    setShow(true);
  }, [dispatch, product, isStock]);

  const onCloseModal = useCallback(() => {
    setShow(prev => !prev);
  }, []);

  return (
    <ProductDetailTemplate
      product={product}
      goBack={goBack}
      onLike={onLike}
      like={isLike}
      stock={isStock}
      onUpdateQuantity={onUpdateQuantity}
      maxStock={maxStock}
      addToCart={onAddCart}
      showModal={isShow}
      onCloseModal={onCloseModal}
    />
  );
};

export default ProductDetailScreen;
