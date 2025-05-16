import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/productTypes';
import { fetchProducts } from '../services/productApi';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProduct: (state, action: PayloadAction<number>) => {
      const temp: Product[] = [];
      for (const item of state.products) {
        if (item.id === action.payload) {
          temp.push({ ...item, favorite: !item.favorite });
        } else {
          temp.push(item);
        }
      }
      state.products = temp;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const temp: Product[] = [];
        for (const item of action.payload) {
          temp.push({ ...item, brand: item.brand ?? '', favorite: false });
        }
        state.products = temp;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
      });
  },
});

export const { updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
