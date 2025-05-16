import React, { FC, memo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ProductItem from '../../components/molecules/ProductItem';
import CategoryNav from '../../components/organisms/CategoryNav';
import { Product } from '../../types/productTypes';
import EmptyState from '../../components/molecules/EmptyState';
import SearchBar from '../../components/molecules/SearchBar';
import Text from '../atoms/Text';
import Header from '../molecules/Header';

interface ProductsTemplateProps {
  query: string;
  onSearch: (query: string) => void;
  categories: string[];
  selectedCategory: string;
  onSelectedCategory: (query: string) => void;
  items: Product[];
  onResetSearch: () => void;
  goToDetail: (product: Product) => void;
  loading?: boolean;
  error?: string | null;
  titleHeader?: string;
}

const ProductsTemplate: FC<ProductsTemplateProps> = ({
  query,
  onSearch,
  categories,
  selectedCategory,
  onSelectedCategory,
  items,
  onResetSearch,
  goToDetail,
  loading,
  error,
  titleHeader,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 32) / 2; // Same as products screen

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item, index }: { item: Product; index: number }) => {
    const isLeft = index % 2 === 0;
    const marginTop = isLeft ? 0 : 30; // Item kanan lebih rendah

    return (
      <TouchableOpacity
        onPress={() => goToDetail(item)}
        style={{ width: itemWidth, marginTop, ...styles.wrapper }}>
        <ProductItem product={item} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {titleHeader && <Header title={titleHeader} />}
      <View style={styles.contain}>
        <SearchBar
          query={query}
          onSearch={onSearch}
          onClear={() => onSearch('')}
        />
        <CategoryNav
          categories={categories}
          selected={selectedCategory}
          onSelected={onSelectedCategory}
        />
      </View>
      {items.length < 1 ? (
        <EmptyState
          title="No Products Found"
          description="Try adjusting your search or filters"
          buttonText="Reset Search"
          onPress={onResetSearch}
        />
      ) : (
        <FlatList
          data={items}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          initialNumToRender={4} // Render 4 items initially (2 rows)
          maxToRenderPerBatch={4}
          windowSize={5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contain: { paddingBottom: 10 },
  wrapper: { paddingHorizontal: 8 },
  list: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default memo(ProductsTemplate);
