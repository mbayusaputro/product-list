import React, { FC } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { Product } from "../../types/productTypes";
import Text from "../atoms/Text";

interface ProductItemProps {
  product: Product;
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text variant="semiBold" style={styles.brand}>
        {product.brand || "Unknown brand"}
      </Text>
      <Text style={styles.title}>{product.title}</Text>
      <Text variant="semiBold" style={styles.price}>
        ${product.price.toFixed(2)}
      </Text>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const itemWidth = (screenWidth - 32) / 2; // Same as products screen

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    alignItems: "center",
  },
  image: {
    width: itemWidth - 20,
    height: itemWidth - 20,
    backgroundColor: "#E7E8E9",
    borderRadius: 16,
    marginBottom: 10,
  },
  brand: {
    fontSize: 16,
    color: "#000",
  },
  title: {
    fontSize: 12,
    color: "#797979",
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    color: "#000",
  },
});

export default ProductItem;
