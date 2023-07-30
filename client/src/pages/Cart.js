import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';


const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const [address, setAddress] = useState('');


  const paypalScriptTag = `
    <script src="https://www.paypal.com/sdk/js?client-id=AXNPSqgCNrtMVEdwhigyao_WPLGiQnKoA76024YaUa-VifCsNefmcquda1GPvUARZtZ511Lrs3VgSBnf&currency=USD"></script>
  `;


  // Calculate the number of items in the cart
  const numItems = cart.length;

  const handleRemoveFromCart = product => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Use the useSelector hook to access the user ID from the authSlice
  const userId = useSelector((state) => state.auth.userId);

  // Calculate the subtotal of the cart
  const subtotal = cart.reduce((total, product) => total + product.price, 0);



 // Add a new order
const createOrder = async (userId, products, subtotal, address) => {
  const date = new Date();
  const startDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);

  const res = await fetch('http://localhost:5000/api/orders/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, products, subtotal, address, date, startDate, endDate, returned: false })
  });
}


 // Handle successful payment
 const handleApprove = async (data, actions) => {

   await actions.order.capture();



   // Add a new order to the backend
   await createOrder(userId, cart, subtotal, address);//'USER_ID'

   // Clear the cart
   dispatch(clearCart());

   alert(`Transaction completed`);
 }



  return (
    <>
      <h2>Cart ({numItems} items)</h2>
      <ul>
        {cart.map(product => (
          <li key={product.id}>
            {product.name} - {product.price}
            <button onClick={() => handleRemoveFromCart(product)}>Delete</button>
          </li>
        ))}
      </ul>
      <p>Subtotal: {subtotal}</p>
      <button onClick={handleClearCart}>Clear Cart</button>
      <label htmlFor="address">Shipping Address:</label>
<input type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} />

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
                application_context: {
                  shipping_preference: 'GET_FROM_FILE'
                }
              });
            }}
            onApprove={handleApprove}
          />
        </PayPalScriptProvider>
    </>
  );
};

export default Cart;
