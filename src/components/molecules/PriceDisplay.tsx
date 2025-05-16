import React, { FC, memo } from "react";
import { View, StyleSheet } from "react-native";
import Text from "../atoms/Text";

interface PriceDisplayProps {
  label: string;
  value: number;
}

const PriceDisplay: FC<PriceDisplayProps> = memo(({ label, value }) => {
  return (
    <View style={styles.container}>
      <Text variant="bold" size={16}>
        {label}:
      </Text>
      <Text variant="bold" size={16}>
        ${value.toFixed(2)}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});

export default PriceDisplay;
