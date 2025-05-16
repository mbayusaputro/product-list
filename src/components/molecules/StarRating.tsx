import React, { FC, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StarRating: FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <Icon key={i} name="star" size={16} color="#FFD700" />;
        }
        if (i === fullStars && hasHalfStar) {
          return <Icon key={i} name="star-half" size={16} color="#FFD700" />;
        }
        return <Icon key={i} name="star-outline" size={16} color="#FFD700" />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default memo(StarRating);
