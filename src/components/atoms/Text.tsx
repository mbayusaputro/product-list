import React, { FC, memo, ReactNode } from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';
import { FontFamily, fonts, FontVariant } from '../../utils/font';

interface TextProps {
  children: ReactNode;
  style?: TextStyle;
  size?: number;
  color?: string;
  fontFamily?: FontFamily;
  variant?: FontVariant;
}

const Text: FC<TextProps> = memo(
  ({
    children,
    style,
    size,
    color,
    fontFamily = 'Poppins',
    variant = 'regular',
  }) => {
    const fontStyle = {
      fontFamily: fonts[fontFamily][variant],
    };
    return (
      <RNText
        style={[
          fontStyle,
          styles.text,
          { fontSize: size },
          color && { color },
          style,
        ]}>
        {children}
      </RNText>
    );
  },
);

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: '#000',
  },
});

export default Text;
