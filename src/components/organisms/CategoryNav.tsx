import React, { FC } from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Text from "../atoms/Text";
import { toTitleCase } from "../../utils/helpers";

interface IProps {
  categories: string[];
  selected: string;
  onSelected: (e: string) => void;
}

const CategoryNav: FC<IProps> = ({ categories, selected, onSelected }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {categories.map(category => (
        <TouchableOpacity
          key={category}
          style={
            category === selected
              ? styles.categorySelected
              : styles.categoryItem
          }
          onPress={() => onSelected(category)}>
          <Text
            color={category === selected ? "#FFFFFF" : undefined}
            variant="semiBold">
            {toTitleCase(category)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    height: 28,
  },
  categoryItem: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  categorySelected: {
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "#000000",
  },
});

export default CategoryNav;
