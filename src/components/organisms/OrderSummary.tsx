import React, { FC, memo } from "react";
import { View, StyleSheet } from "react-native";
import Text from "../atoms/Text";
import PriceDisplay from "../molecules/PriceDisplay";
import { OrderSummary as OrderSummaryType } from "../../types/cartTypes";
import Button from "../atoms/Button";

interface OrderSummaryProps {
  summary: OrderSummaryType;
}

const OrderSummary: FC<OrderSummaryProps> = memo(({ summary }) => {
  return (
    <View style={styles.container}>
      <PriceDisplay label="Subtotal" value={summary.subtotal} />
      <PriceDisplay label="Shipping" value={summary.shipping} />
      <View style={styles.totalContainer}>
        <Text variant="bold" size={16}>
          BagTotal: ({summary.itemCount} item
          {summary.itemCount !== 1 ? "s" : ""})
        </Text>
        <Text variant="bold" size={16}>
          ${summary.total.toFixed(2)}
        </Text>
      </View>
      <Button title="Procced to Checkout" onPress={undefined} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E7E8E9",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingBottom: 20,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#E7E8E9",
  },
});

export default OrderSummary;
