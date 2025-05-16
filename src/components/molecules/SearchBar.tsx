import React, { FC, memo } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchBarProps {
  query: string;
  onSearch: (query: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

const SearchBar: FC<SearchBarProps> = ({
  query,
  onSearch,
  onClear,
  placeholder = 'Search...',
}) => {
  const handleClear = () => {
    onClear?.();
  };

  return (
    <View style={styles.container}>
      <Icon name="search" size={20} style={styles.searchIcon} />
      <TextInput
        value={query}
        onChangeText={text => {
          onSearch(text);
        }}
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#999"
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Icon name="close" size={18} color="#999" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 35,
    paddingHorizontal: 12,
    margin: 16,
  },
  searchIcon: {
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  clearButton: {
    padding: 4,
  },
});

export default memo(SearchBar);
