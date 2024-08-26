import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';

//Redux
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import {  CartProvider } from './contexts/cartContext';
import { AddressProvider } from './contexts/AddressContext'; // Import your context

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AddressProvider>
  <  CartProvider>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
       <React.StrictMode>
         <App />
       </React.StrictMode>
    </PersistGate>
  </Provider>
     </ CartProvider>
     </AddressProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

