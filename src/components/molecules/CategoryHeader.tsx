import React, { FC, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../atoms/Text';

interface CategoryHeaderProps {
  title: string;
}

const CategoryHeader: FC<CategoryHeaderProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text variant="semiBold" style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 22,
    color: '#000',
  },
});

export default memo(CategoryHeader);
