import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const OverdueOrders = () => {
  const [overdueOrders, setOverdueOrders] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    fetchOverdueOrders();
  }, [userId]);

  const fetchOverdueOrders = async () => {
    const res = await fetch(`http://localhost:5000/api/orders/overdue/${userId}`);
    const data = await res.json();
    setOverdueOrders(data);
  }

  const handleMarkAsReturned = async (orderId) => {
    await fetch(`http://localhost:5000/api/orders/${orderId}/returned`, {
      method: 'PUT'
    });

    // Refetch the overdue orders
    fetchOverdueOrders();
  }

  if (!Array.isArray(orders)) {
    return <p>No overdue orders.</p>;
  }

  return (
  <>
    <h2>Overdue Orders</h2>
    <ul>
      {overdueOrders.map(order => (
        <li key={order._id}>
          Order ID: {order._id} - User: {order.user.name} - Start Date: {new Date(order.startDate).toLocaleDateString()} - End Date: {new Date(order.endDate).toLocaleDateString()}
          <button onClick={() => handleMarkAsReturned(order._id)}>Mark as Returned</button>
          <ul>
            {order.products.map(product => (
              <li key={product._id}>
                Product: {product.name} - Price: {product.price}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </>
);

  
};

/*
<h2>Overdue Rentals</h2>
      <ul>
        {overdueRentals.map(rental => (
          <li key={rental._id}>
            User: {rental.userId} - Start Date: {new Date(rental.startDate).toLocaleDateString()} - End Date: {new Date(rental.endDate).toLocaleDateString()}


*/
export default OverdueOrders;
