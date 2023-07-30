import React, { useState } from 'react';
import { useSelector } from 'react-redux';
//import UserList from './UserList';
import ProductList from './ProductList';
import OrderList from './OrderList';
import OverdueOrders from './OverdueOrders';
import ProductAdd from './ProductAdd';
import UsersWithOverdueOrders from './UsersWithOverdueOrders';

const AdminDashboard = ({ users, products }) => {
  const [selectedItem, setSelectedItem] = useState('users');
  const isAdmin = useSelector(state => state.auth.isAdmin);
/*
  if (!isAdmin) {
    return <p>You must be an admin to view this page.</p>;
  } */

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '200px' }}>
        <h2>Menu</h2>
        <ul>
        <li>
            <button onClick={() => setSelectedItem('products')}>Products</button>
          </li>
          <li>
            <button onClick={() => setSelectedItem('orders')}>Orders</button>
          </li>
          <li>
            <button onClick={() => setSelectedItem('overdueOrders')}>Overdue Orders</button>
          </li>
          <li>
            <button onClick={() => setSelectedItem('productAdd')}>Add Product</button>
          </li>
          <li>
            <button onClick={() => setSelectedItem('usersWithOverdueOrders')}>Users with Overdue Orders</button>
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
