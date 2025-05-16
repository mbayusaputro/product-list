import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  onPress?: () => void;
}

const EmptyState: FC<EmptyStateProps> = ({
  title,
  description,
  buttonText,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Text variant="semiBold" style={styles.title}>
        {title}
      </Text>
      <Text style={styles.description}>{description}</Text>
      {buttonText && (
        <Button title={buttonText} onPress={onPress} style={styles.button} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    width: "60%",
  },
});

export default EmptyState;
