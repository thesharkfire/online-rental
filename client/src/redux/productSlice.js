
        // create a slice to manage the items state
        import { createSlice } from '@reduxjs/toolkit';

        const productsSlice = createSlice({
          name: 'products',
          initialState: null,
          reducers: {
            setProducts: (state, action) => {
                  return action.payload;
             },
            createProduct: (state, action) => {
              state.push(action.payload);
            },

            deleteProduct: (state, action) => {
              return state.filter((w) => w._id !== action.payload);
          }
          /*
          reviewProduct: (state, action){
            await api.review(value, id)
          }
          */

        //  review = (value, id) => API.patch(`/products/${id}`, {value})
          }
        });

        export const { createProduct, setProducts,deleteProduct } = productsSlice.actions;
        export default productsSlice.reducer;
