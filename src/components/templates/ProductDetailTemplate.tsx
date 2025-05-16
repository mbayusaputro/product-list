import React, { FC, memo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Text from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';
import StarRating from '../../components/molecules/StarRating';
import QuantitySelector from '../../components/atoms/QuantitySelector';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomModal from '../../components/molecules/Modal';
import { Product } from '../../types/productTypes';

interface ProductDetailTemplateProps {
  product: Product;
  goBack: () => void;
  onLike: () => void;
  like: boolean;
  stock: number;
  onUpdateQuantity: (str: string) => void;
  maxStock: number;
  addToCart: () => void;
  showModal: boolean;
  onCloseModal: () => void;
}

const ProductDetailTemplate: FC<ProductDetailTemplateProps> = ({
  product,
  goBack,
  onLike,
  like,
  stock,
  onUpdateQuantity,
  maxStock,
  addToCart,
  showModal,
  onCloseModal,
}) => {
  return (
    <ScrollView style={styles().container}>
      {/* Product Image Section */}
      <View style={styles().wrapper}>
        <Image
          style={styles().imagePlaceholder}
          source={{ uri: product.images[0] }}
        />
        <TouchableOpacity onPress={goBack} style={styles().iconBack}>
          <Icon size={40} name="arrow-back-circle" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onLike} style={styles().icon}>
          <Icon
            size={24}
            name={like ? 'heart' : 'heart-outline'}
            color="#83201C"
          />
        </TouchableOpacity>
      </View>

      {/* Product Info Section */}
      <View style={styles().content}>
        <View style={styles().contentLeft}>
          <View>
            <Text variant="semiBold" style={styles().brand}>
              {product.brand}
            </Text>
            <Text style={styles().title}>{product.title}</Text>

            {/* Rating */}
            <View style={styles().ratingContainer}>
              <StarRating rating={product.rating} />
              <Text variant="semiBold" style={styles().reviewText}>
                ({product.reviews.length} Reviews)
              </Text>
            </View>
          </View>
          <View>
            <QuantitySelector
              quantity={stock}
              onIncrease={() => onUpdateQuantity('+')}
              onDecrease={() => onUpdateQuantity('-')}
            />
            <Text variant="semiBold" style={styles(stock >= maxStock).text}>
              {stock >= maxStock
                ? 'Maximum in Cart'
                : product.availabilityStatus}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles().section}>
          <Text variant="semiBold" style={styles().sectionTitle}>
            Description
          </Text>
          <Text style={styles().description}>{product.description}</Text>
        </View>

        {/* Divider */}
        <View style={styles().divider} />

        {/* Price and Add to Cart */}
        <View style={styles().priceContainer}>
          <View>
            <Text style={styles().priceLabel}>Total Price</Text>
            <Text variant="semiBold" style={styles().price}>
              ${product.price.toFixed(2)}
            </Text>
          </View>
          <Button
            icon="bag-handle-outline"
            title="Add to Cart"
            onPress={addToCart}
          />
          <CustomModal visible={showModal} onClose={onCloseModal} />
        </View>
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = (props?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E7E8E9',
    },
    wrapper: { position: 'relative' },
    text: {
      fontSize: 12,
      marginTop: 5,
      color: props ? 'red' : undefined,
      textAlign: 'center',
    },
    icon: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      backgroundColor: '#FFFFFF',
      borderRadius: 100,
      padding: 8,
    },
    iconBack: {
      position: 'absolute',
      left: 20,
      top: 50,
    },
    imagePlaceholder: {
      width: width,
      height: width,
      backgroundColor: '#E7E8E9',
    },
    content: {
      padding: 20,
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      backgroundColor: '#FFFFFF',
      paddingBottom: 70,
    },
    contentLeft: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    brand: {
      fontSize: 20,
      marginBottom: 4,
    },
    title: {
      marginBottom: 8,
      color: '#797979',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
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
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    sizeButton: {
      width: 50,
      height: 50,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#ddd',
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedSize: {
      borderColor: '#000',
      backgroundColor: '#F5F5F5',
    },
    sizeText: {
      fontSize: 16,
    },
    description: {
      lineHeight: 22,
      color: '#797979',
    },
    divider: {
      height: 1,
      backgroundColor: '#eee',
      marginVertical: 24,
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    priceLabel: {
      fontSize: 12,
      color: '#797979',
    },
    price: {
      fontSize: 18,
    },
  });

export default memo(ProductDetailTemplate);
