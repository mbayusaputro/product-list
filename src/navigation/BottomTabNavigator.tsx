import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsScreen from "../screens/ProductScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { RootStackParamList } from "./types";
import Icon from "react-native-vector-icons/Ionicons";
import Text from "../components/atoms/Text";

// Create stack navigators for each tab
const ProductStack = createNativeStackNavigator<RootStackParamList>();
const CartStack = createNativeStackNavigator<RootStackParamList>();
const FavoriteStack = createNativeStackNavigator<RootStackParamList>();

const ProductsStack = () => (
  <ProductStack.Navigator screenOptions={{ headerShown: false }}>
    <ProductStack.Screen name="Products" component={ProductsScreen} />
    <ProductStack.Screen name="ProductDetail" component={ProductDetailScreen} />
  </ProductStack.Navigator>
);

const CartsStack = () => (
  <CartStack.Navigator screenOptions={{ headerShown: false }}>
    <CartStack.Screen name="Cart" component={CartScreen} />
  </CartStack.Navigator>
);

const FavoritesStack = () => (
  <FavoriteStack.Navigator screenOptions={{ headerShown: false }}>
    <FavoriteStack.Screen name="Favorite" component={FavoriteScreen} />
    <FavoriteStack.Screen
      name="ProductDetail"
      component={ProductDetailScreen}
    />
  </FavoriteStack.Navigator>
);

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0,
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#000000", // Active tab color
        tabBarInactiveTintColor: "#D4D4D4", // Inactive tab color
        tabBarStyle: {
          paddingBottom: 5, // Adjust for Android
          height: 60, // Tab bar height
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        },
      }}>
      {/* Home / Products Tab */}
      <Tab.Screen
        name="Products"
        component={ProductsStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
          headerShown: false, // Hide default header
        }}
      />

      {/* Cart Tab (with badge) */}
      <Tab.Screen
        name="Cart"
        component={CartsStack}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size }) => (
            <View style={{ position: "relative" }}>
              <Icon name="bag-handle" color={color} size={size} />
              {cartItemCount > 0 && (
                <View style={styles.badge}>
                  <Text variant="semiBold" style={styles.badgeText}>
                    {cartItemCount}
                  </Text>
                </View>
              )}
            </View>
          ),
          headerShown: false,
        }}
      />

      {/* Favorite Tab (example) */}
      <Tab.Screen
        name="Favorites"
        component={FavoritesStack}
        options={{
          tabBarLabel: "Favorite",
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -10,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
});

export default BottomTabNavigator;
