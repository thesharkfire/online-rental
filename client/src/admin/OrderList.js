import React, { useState, useEffect } from 'react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`http://localhost:5000/api/orders`);
      const data = await res.json();
      setOrders(data);
    }

    fetchOrders();
  }, []);

  return (
    <>
      <h2>All Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            Order ID: {order._id} - User: {order.user.name} - Address: {order.address}
          </li>
        ))}
      </ul>
    </>
  );
};

export default OrderList;
