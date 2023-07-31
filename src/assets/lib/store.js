// store/index.js
import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './cartSlice';
import cartReducer from './cart/cartSlice';
import productReducer from './product/productSlice';


const store = configureStore({
  reducer: {
    cart: cartReducer,
    products : productReducer,
  },
});


export default store;
