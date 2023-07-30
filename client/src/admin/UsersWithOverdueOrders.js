import React, { useState, useEffect } from 'react';

const UsersWithOverdueOrders = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersWithOverdueOrders();
  }, []);

  const fetchUsersWithOverdueOrders = async () => {
    const res = await fetch(`http://localhost:5000/api/users/overdue`);
    const data = await res.json();
    setUsers(data);
  }

  const handleSuspendUser = async (userId) => {
    await fetch(`http://localhost:5000/api/users/${userId}/suspend`, {
      method: 'PUT'
    });

    // Refetch the users with overdue orders
    fetchUsersWithOverdueOrders();
  }

  const handleUnsuspendUser = async (userId) => {
    await fetch(`http://localhost:5000/api/users/${userId}/unsuspend`, {
      method: 'PUT'
    });

    // Refetch the users with overdue orders
    fetchUsersWithOverdueOrders();
  }

  return (
    <>
      <h2>Users with Overdue Orders</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            User ID: {user._id} - Name: {user.name}
            {!user.suspended && (
              <button onClick={() => handleSuspendUser(user._id)}>Suspend</button>
            )}
            {user.suspended && (
              <button onClick={() => handleUnsuspendUser(user._id)}>Unsuspend</button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default UsersWithOverdueOrders;
