import React, { useState } from 'react';
import { useSelector } from 'react-redux';
//import UserList from './UserList';
import ProductList from './ProductList';
import OrderList from './OrderList';
import OverdueOrders from './OverdueOrders';
import ProductAdd from './ProductAdd';
import UserList from './UserList';
import UsersWithOverdueOrders from './UsersWithOverdueOrders';

const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    marginTop: '10px',
  };

const AdminDashboard = ({ users, products }) => {
  const [selectedItem, setSelectedItem] = useState('users');
  const isAdmin = useSelector(state => state.auth.isAdmin);

  const user = useSelector((state) => state.auth.user) || "";
/* */
  if(user.role === 'user') {
    return <p>You must be an admin to view this page.</p>;
  }

const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '200px' }}>
        <h2>Menu</h2>
        <ul style={{ listStyle: 'none'}}>
        <li>
            <button onClick={() => setSelectedItem('products')}  style={buttonStyle}>Products</button>
          </li>
          <li>
            <button onClick={() => setSelectedItem('orders')}  style={buttonStyle} >Orders</button>
          </li>
          <li>
            <button onClick={() => setSelectedItem('overdueOrders')}  style={buttonStyle}>Overdue Orders</button>
          </li>
          <li>
            <button onClick={() => setSelectedItem('productAdd')}  style={buttonStyle}>Add Product</button>
          </li>
          <li>
            <button onClick={() => setSelectedItem('usersWithOverdueOrders')}  style={buttonStyle}>Users with Overdue Orders</button>
          </li>
          <li>
            <button onClick={() => setSelectedItem('UserList')}  style={buttonStyle}> User List</button>
          </li>
        </ul>
      </div>
      <div style={{ flex: 1 }}>
        <h1>Admin Dashboard</h1>
       
        {selectedItem === 'products' && <ProductList products={products} />}
        {selectedItem === 'orders' && <OrderList />}
        {selectedItem === 'overdueOrders' && <OverdueOrders />}
        {selectedItem === 'productAdd' && <ProductAdd />}
        {selectedItem === 'usersWithOverdueOrders' && <UsersWithOverdueOrders />}
        {selectedItem === 'UserList' && <UserList />}
      </div>
    </div>
  );
};
/*
ul
{/* 
          <li>
            <button onClick={() => setSelectedItem('users')}>Users</button>
          </li>
          
          /}

Admin dash
{/**  {selectedItem === 'users' && <UserList users={users} />}}
*/
export default AdminDashboard;
