import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create an async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async () => {

      let auntication = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "username": "kminchelle",
          "password": "0lelplR"
      })
      })

      let token =  await auntication.json()

    const response = await fetch('https://dummyjson.com/products', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'  ,token },
    });
    const data = await response.json();
    return data.products;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [], // Set initial value as an empty array
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
