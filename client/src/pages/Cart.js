import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';


const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // Calculate the number of items in the cart
  const numItems = cart.length;

  const handleRemoveFromCart = product => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Use the useSelector hook to access the user ID from the authSlice
  const userId = useSelector((state) => state.auth.user.userId);

  // Calculate the subtotal of the cart
  const subtotal = cart.reduce((total, product) => total + product.price, 0);

  // Add a new order
 const createOrder = async (userId, products, subtotal,address) => {
   const res = await fetch('http://localhost:5000//api/orders/', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({ userId, products, subtotal,address })
   });
 }

 // Handle successful payment
 const handleApprove = async (data, actions) => {
   await actions.order.capture();

   // Get the user's shipping address from PayPal
  const address = data.shipping.address;

   // Add a new order to the backend
   await createOrder(userId, cart, subtotal, address);//'USER_ID'

   // Clear the cart
   dispatch(clearCart());

   alert(`Transaction completed by ${data.payer.name.given_name}!`);
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
      {/*Paypal Button*/}
      <PayPalScriptProvider options={{ "client-id": "AXNPSqgCNrtMVEdwhigyao_WPLGiQnKoA76024YaUa-VifCsNefmcquda1GPvUARZtZ511Lrs3VgSBnf", currency: "KES"  }}>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    currency_code: "KES",
                    value: subtotal
                  }
                }],
                application_context: {
                  shipping_preference: 'SET_PROVIDED_ADDRESS'
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
