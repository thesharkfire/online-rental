const cartSlice = createSlice({
  name:"cart",
  initialState:{
	products: [],
	quantity: 0,
	total: 0

},
reducers:{



}
})





addToCart: (state, action) => {
      // Check if the product is already in the cart
     // const productInCart = state.find(product => product.id === action.payload.id);

      // Only add the product to the cart if it's not already in the cart
     // if (!productInCart) {
        return [...state, action.payload];
    //  }

      // If the product is already in the cart, don't add it again
      //return state;
    }


    import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      return state.filter(product => product.id !== action.payload.id);
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;


npm install  @reduxjs/toolkit react-redux --force





context api







