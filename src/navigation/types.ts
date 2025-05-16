import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Product } from '../types/productTypes';

export type RootStackParamList = {
  Products: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
  CartDetail: { product: Product };
  Favorite: undefined;
  FavoriteDetail: { product: Product };
};

export type ProductListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Products'
>;

export type CartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Cart'
>;

export type FavoriteScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Favorite'
>;

export type ProductDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;

export type FavoriteDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FavoriteDetail'
>;
