import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchProducts } from '../services/productApi';
import { RootState } from '../store/store';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { Product } from '../types/productTypes';
import { getCategory, getProduct } from '../utils/helpers';
import { useNavigation } from '@react-navigation/native';
import { ProductListNavigationProp } from '../navigation/types';
import ProductsTemplate from '../components/templates/ProductTemplate';

const ProductsScreen: FC = () => {
  const navigation = useNavigation<ProductListNavigationProp>();
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  const [isCategory, setCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Type-safe dispatch
    dispatch(fetchProducts());
  }, [dispatch]);

  const detailProduct = useCallback(
    (product: Product) => {
      navigation.navigate('ProductDetail', { product });
    },
    [navigation],
  );

  const onResetSearch = useCallback(() => {
    setCategory('all');
    setSearchQuery('');
  }, []);

  const data = useMemo(
    () => getProduct(products, isCategory),
    [products, isCategory],
  );
  // Filter products based on search
  const filteredProducts = useMemo(
    () =>
      data.filter(
        product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [data, searchQuery],
  );
  const categories = useMemo(() => getCategory(products), [products]);

  return (
    <ProductsTemplate
      query={searchQuery}
      onSearch={setSearchQuery}
      categories={categories}
      selectedCategory={isCategory}
      onSelectedCategory={setCategory}
      items={filteredProducts}
      onResetSearch={onResetSearch}
      goToDetail={detailProduct}
      error={error}
      loading={loading}
    />
  );
};

export default ProductsScreen;
