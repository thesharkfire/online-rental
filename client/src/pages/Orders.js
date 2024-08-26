import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const dispatch = useDispatch();
   const userId = useSelector((state) => state.auth.userId);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
   // const userId = localStorage.getItem('userId'); // Retrieve user ID from localStorage
      
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/overdue/${userId}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching overdue orders:', error);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '1rem', border: '1px solid #ccc' }}>
      <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Orders</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}> 
        {orders.map((order) => (
          <li key={order._id} style={{ marginBottom: '1rem' }}>
            Order ID: {order._id}
            <ul style={{ listStyle: 'none', marginLeft: '1rem' }} >
            {order.products.map(product => (
              <li key={product._id}>
                 <div>
                Contents: {product.title} 
                </div>
                <div>
                Start Date: {new Date(order.startDate).toLocaleDateString()} - End Date: {new Date(order.endDate).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
