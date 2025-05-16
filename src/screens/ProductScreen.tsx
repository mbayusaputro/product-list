import React, { FC, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { fetchProducts } from "../services/productApi";
import ProductItem from "../components/molecules/ProductItem";
import { RootState } from "../store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import CategoryNav from "../components/organisms/CategoryNav";
import { Product } from "../types/productTypes";
import { getCategory, getProduct } from "../utils/helpers";

import { useNavigation } from "@react-navigation/native";
import { ProductListNavigationProp } from "../navigation/types";
import EmptyState from "../components/molecules/EmptyState";
import SearchBar from "../components/molecules/SearchBar";

const ProductsScreen: FC = () => {
  const navigation = useNavigation<ProductListNavigationProp>();
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  const [isCategory, setCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    // Type-safe dispatch
    dispatch(fetchProducts());
  }, [dispatch]);

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

  const detailProduct = (product: Product) => {
    navigation.navigate("ProductDetail", { product });
  };

  const screenWidth = Dimensions.get("window").width;
  const itemWidth = (screenWidth - 32) / 2; // Same as products screen

  const renderItem = ({ item, index }: { item: Product; index: number }) => {
    const isLeft = index % 2 === 0;
    const marginTop = isLeft ? 0 : 30; // Item kanan lebih rendah

    return (
      <TouchableOpacity
        onPress={() => detailProduct(item)}
        style={{ width: itemWidth, paddingHorizontal: 8, marginTop }}>
        <ProductItem product={item} />
      </TouchableOpacity>
    );
  };

  const data = getProduct(products, isCategory);
  // Filter products based on search
  const filteredProducts = data.filter(
    product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 10 }}>
        <SearchBar
          onSearch={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />
        <CategoryNav
          categories={getCategory(products)}
          selected={isCategory}
          onSelected={setCategory}
        />
      </View>
      {filteredProducts.length < 1 ? (
        <EmptyState
          title="No Products Found"
          description="Try adjusting your search or filters"
          buttonText="Reset Search"
          onPress={() => {
            setCategory("all");
            setSearchQuery("");
          }}
        />
      ) : (
        <FlatList
          data={filteredProducts}
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
    backgroundColor: "#FFFFFF",
  },
  list: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default ProductsScreen;
