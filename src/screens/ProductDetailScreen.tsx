import React, { FC, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
import StarRating from "../components/molecules/StarRating";
import {
  CartScreenNavigationProp,
  ProductDetailScreenProps,
} from "../navigation/types";
import QuantitySelector from "../components/atoms/QuantitySelector";
import Icon from "react-native-vector-icons/Ionicons";
import { updateProduct } from "../store/productSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addToCart } from "../store/cartSlice";
import CustomModal from "../components/molecules/Modal";
import { useNavigation } from "@react-navigation/native";

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

  return (
    <ScrollView style={styles.container}>
      {/* Product Image Section */}
      <View style={{ position: "relative" }}>
        <Image
          style={styles.imagePlaceholder}
          source={{ uri: product.images[0] }}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconBack}>
          <Icon size={40} name="arrow-back-circle" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(updateProduct(product.id));
            setLike(prev => !prev);
          }}
          style={styles.icon}>
          <Icon
            size={24}
            name={isLike ? "heart" : "heart-outline"}
            color="#83201C"
          />
        </TouchableOpacity>
      </View>

      {/* Product Info Section */}
      <View style={styles.content}>
        <View style={styles.contentLeft}>
          <View>
            <Text variant="semiBold" style={styles.brand}>
              {product.brand}
            </Text>
            <Text style={styles.title}>{product.title}</Text>

            {/* Rating */}
            <View style={styles.ratingContainer}>
              <StarRating rating={product.rating} />
              <Text variant="semiBold" style={styles.reviewText}>
                ({product.reviews.length} Reviews)
              </Text>
            </View>
          </View>
          <View>
            <QuantitySelector
              quantity={isStock}
              onIncrease={() =>
                setStock(prev => (prev < maxStock ? prev + 1 : prev))
              }
              onDecrease={() => setStock(prev => (prev > 1 ? prev - 1 : prev))}
            />
            <Text
              variant="semiBold"
              style={{
                fontSize: 12,
                marginTop: 5,
                color: isStock >= maxStock ? "red" : undefined,
                textAlign: "center",
              }}>
              {isStock >= maxStock
                ? "Maximum in Cart"
                : product.availabilityStatus}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text variant="semiBold" style={styles.sectionTitle}>
            Description
          </Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Price and Add to Cart */}
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.priceLabel}>Total Price</Text>
            <Text variant="semiBold" style={styles.price}>
              ${product.price.toFixed(2)}
            </Text>
          </View>
          <Button
            icon="bag-handle-outline"
            title="Add to Cart"
            onPress={() => {
              dispatch(addToCart(product));
              setShow(true);
            }}
          />
          <CustomModal
            visible={isShow}
            onClose={() => {
              setShow(prev => !prev);
              // navigation.navigate("Cart");
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7E8E9",
  },
  icon: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    padding: 8,
  },
  iconBack: {
    position: "absolute",
    left: 20,
    top: 50,
  },
  imagePlaceholder: {
    width: width,
    height: width,
    backgroundColor: "#E7E8E9",
  },
  content: {
    padding: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: "#FFFFFF",
    paddingBottom: 70,
  },
  contentLeft: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    fontSize: 20,
    marginBottom: 4,
  },
  title: {
    marginBottom: 8,
    color: "#797979",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  reviewText: {
    marginLeft: 8,
    fontSize: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  sizeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  sizeButton: {
    width: 50,
    height: 50,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedSize: {
    borderColor: "#000",
    backgroundColor: "#F5F5F5",
  },
  sizeText: {
    fontSize: 16,
  },
  description: {
    lineHeight: 22,
    color: "#797979",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 24,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 12,
    color: "#797979",
  },
  price: {
    fontSize: 18,
  },
});

export default ProductDetailScreen;
