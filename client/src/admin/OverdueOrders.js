import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const OverdueOrders = () => {
  const [overdueOrders, setOverdueOrders] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    fetchOverdueOrders();
  }, [userId]);

  const fetchOverdueOrders = async () => {
    const res = await fetch(`http://localhost:5000/api/orders/overdue/all`);
    const data = await res.json();
       

    setOverdueOrders(data.reverse());
  }
 
  const handleMarkAsReturned = async (orderId) => {
    await fetch(`http://localhost:5000/api/orders/${orderId}/returned`, {
      method: 'PUT'
    });

    // Refetch the overdue orders
    fetchOverdueOrders();
  }

  if (!Array.isArray(overdueOrders)) {
    return <p>No overdue orders.</p>;
  }

  return (
  <div >
    <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Overdue Orders</h2>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {overdueOrders.map(order => (
        <li key={order._id}   style={{ marginBottom: '1rem' }}>
          Order ID: {order._id} - User: {order.email} - Start Date: {new Date(order.startDate).toLocaleDateString()} - End Date: {new Date(order.endDate).toLocaleDateString()}
          <button onClick={() => handleMarkAsReturned(order._id)}>Mark as Returned</button>
          <ul  style={{ listStyle: 'none'}}>
            {order.products.map(product => (
              <li key={product._id}>
                Product: {product.title} - Price: {product.price}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </div>
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
