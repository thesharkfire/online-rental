import React, { useState, useEffect } from 'react';

const UsersWithOverdueOrders = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersWithOverdueOrders();
  }, []);

  const fetchUsersWithOverdueOrders = async () => {
   try {
      const res = await fetch(`http://localhost:5000/api/user/overdue`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  }

  const handleSuspendUser = async (userId) => {
    await fetch(`http://localhost:5000/api/user/${userId}/suspend`, {
      method: 'PUT'
    });

    // Refetch the users with overdue orders
    fetchUsersWithOverdueOrders();
  } 

  const handleUnsuspendUser = async (userId) => {
    await fetch(`http://localhost:5000/api/user/${userId}/unsuspend`, {
      method: 'PUT'
    });

    // Refetch the users with overdue orders
    fetchUsersWithOverdueOrders();
  }
  if (!Array.isArray(users)) {
    return <p>No users with overdue orders available.</p>;
  }

  return (
    <>
      <h2>Users with Overdue Orders</h2>
      <ul style={{ listStyle: 'none'}}>
           { 
          users.map(user => (
          <li key={user._id}>
            {console.log(user._id)}
              {user.email}
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
