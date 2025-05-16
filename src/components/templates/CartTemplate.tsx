import React, { FC, memo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import CartItem from "../molecules/CartItem";
import OrderSummary from "../organisms/OrderSummary";
import {
  CartItem as CartItemType,
  OrderSummary as OrderSummaryType,
} from "../../types/cartTypes";
import EmptyState from "../molecules/EmptyState";
import { useNavigation } from "@react-navigation/native";
import { CartScreenNavigationProp } from "../../navigation/types";
import Text from "../atoms/Text";
import Header from "../molecules/Header";

interface CartTemplateProps {
  items: CartItemType[];
  summary: OrderSummaryType;
  onQuantityChange: (id: number, quantity: number) => void;
  emptyCartMessage?: string;
}

const CartTemplate: FC<CartTemplateProps> = memo(
  ({ items, summary, onQuantityChange }) => {
    const navigation = useNavigation<CartScreenNavigationProp>();

    if (items.length === 0) {
      return (
        <EmptyState
          title="Your Cart is Empty"
          description="Looks like you haven't added any items yet"
          buttonText="Browse Products"
          onPress={() => navigation.navigate("Products")}
        />
      );
    }

    return (
      <View style={styles.container}>
        <Header title="My Cart" />
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onQuantityChange={newQty => onQuantityChange(item.id, newQty)}
            />
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={<OrderSummary summary={summary} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  listContent: {
    padding: 16,
  },
});

export default CartTemplate;
