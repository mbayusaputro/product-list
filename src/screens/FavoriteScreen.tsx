import React, { FC, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Product } from '../types/productTypes';
import { getCategory, getFavorite, getProduct } from '../utils/helpers';
import { useNavigation } from '@react-navigation/native';
import { ProductListNavigationProp } from '../navigation/types';
import EmptyState from '../components/molecules/EmptyState';
import ProductsTemplate from '../components/templates/ProductTemplate';

const ProductsScreen: FC = () => {
  const navigation = useNavigation<ProductListNavigationProp>();
  const { products } = useSelector((state: RootState) => state.products);

  const [isCategory, setCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const favorites = useMemo(() => getFavorite(products), [products]);
  const data = useMemo(
    () => getProduct(favorites, isCategory),
    [favorites, isCategory],
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

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No Favorites Yet"
        description="Save your favorite products to find them easily later"
        buttonText="Discover Products"
        onPress={() => navigation.navigate('Products')}
      />
    );
  }
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
      titleHeader="Favorite"
    />
  );
};

export default ProductsScreen;
