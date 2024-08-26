import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useCart } from '../contexts/cartContext';
import { useAddress } from '../contexts/AddressContext'; // Import the context

const Cart = () => {
  //const cart = useSelector(state => state.cart);
  const { dispatch } = useCart();
 
  const { state } = useCart();
const { cart } = state; // Destructure the cart from the state
  //const dispatch = useDispatch();

  const { address, updateAddress } = useAddress();


  const paypalScriptTag = `
    <script src="https://www.paypal.com/sdk/js?client-id=AXNPSqgCNrtMVEdwhigyao_WPLGiQnKoA76024YaUa-VifCsNefmcquda1GPvUARZtZ511Lrs3VgSBnf"></script>
  `;


  // Calculate the number of items in the cart
  const numItems = cart.length;

  const handleRemoveFromCart = (product) => {
  dispatch({ type: 'REMOVE_FROM_CART', payload: product });
};


 const handleClearCart = () => {
  dispatch({ type: 'CLEAR_CART' });
};


  // Use the useSelector hook to access the user ID from the authSlice
  const userId = useSelector((state) => state.auth.userId);
  const userEmail = useSelector((state) => state.auth.email);

  // Calculate the subtotal of the cart
   // Calculate the subtotal of all items in the cart
  const subtotal = cart.reduce((total, item) => total + item.price , 0);

  const product = 0
/*
  if (cart && cart.length > 0) {
  const subtotal = cart.reduce((total, product) => total + product.price, 0);
  // Use the subtotal
} else {
  // Handle the case where cart is null or empty
   const subtotal = 0
}
*/

 // Add a new order
const createOrder = async (userId, products, userEmail, subtotal, address) => {//, address
  //const { address } = useAddress(); // Get the address from the context
  const date = new Date();
  /*
  const startDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);
  */
  const startDate = new Date(Date.now() + 10000); // 10 seconds from now
const endDate = new Date(startDate.getTime() + 30000); // 30 seconds from the startDate

  //const addr = "101 Wayaki way"
  const res = await fetch('http://localhost:5000/api/orders/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, products, userEmail, subtotal, address, date, startDate, endDate, returned: false })
  });
}


 // Handle successful payment
 const handleApprove = async (data, actions) => {

   await actions.order.capture();
   //const { address } = useAddress();


   // Add a new order to the backend
   await createOrder(userId, cart, userEmail, subtotal, address);//'USER_ID'   , address

   // Clear the cart
   //dispatch(clearCart());
     dispatch({ type: 'CLEAR_CART' });
   alert(`Transaction completed`);
 }



  return (
    <>
      <h2>Cart ({numItems} items)</h2>
      <ul>
          {
          cart.length > 0 ? (
    cart.map((product) => (
      <li key={product.id}>
        {product.title} - {product.price}
        <button onClick={() => handleRemoveFromCart(product)}>Delete</button>
      </li>
    ))
  ) : (
    <li>Your cart is empty.</li>
  )}
      </ul>
      <p>Subtotal: {subtotal}</p>
      <button onClick={handleClearCart}>Clear Cart</button>
      <label htmlFor="address">Shipping Address:</label>
<input type="text" id="address" value={address} onChange={e => updateAddress(e.target.value)} />

      {/*Paypal Button*/}
      <PayPalScriptProvider script={paypalScriptTag} options={{ "client-id": "AXNPSqgCNrtMVEdwhigyao_WPLGiQnKoA76024YaUa-VifCsNefmcquda1GPvUARZtZ511Lrs3VgSBnf", currency: "USD"  }}>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    currency_code: "USD",
                    value: subtotal
                  }
                }],
                
              });
            }}
            onApprove={handleApprove}
          />
        </PayPalScriptProvider>
    </>
  );
};

export default Cart;
