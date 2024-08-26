// src/app/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterReducer from './counter';
//import WorkoutsReducer from './WorkoutsSlice';
import authReducer from './authSlice';
import productReducer from './productSlice'
import cartReducer from './cartSlice'
import searchResultsReducer from './searchResultsSlice'

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  counter: counterReducer,
   
  auth: authReducer,
  products: productReducer,
  cart:cartReducer,
  searchResults: searchResultsReducer

 // cart: cartSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
