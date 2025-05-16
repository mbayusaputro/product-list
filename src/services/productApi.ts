import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/productTypes';
import { AppDispatch, RootState } from '../store/store';

export const fetchProducts = createAsyncThunk<
  Product[], // Return type
  void, // Argument type
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>('products/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.products as Product[];
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Unknown error',
    );
  }
});
