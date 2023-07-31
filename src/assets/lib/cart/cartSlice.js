// // store/cartSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     cartItems: [],
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       state.cartItems.push(action.payload);
//     },
//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter(
//         (item) => item.id !== action.payload
//       );
//     },
//   },
// });

// export const { addToCart, removeFromCart } = cartSlice.actions;

// export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.id === newItem.id );
      if (existingItem) {
        existingItem.quantity += 1; // Update the quantity
      } else {
        state.cartItems.push(newItem); // Add a new item
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.cartItems.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;

