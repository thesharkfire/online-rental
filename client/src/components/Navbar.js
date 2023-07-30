import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logout from './Logout';
//import Cart from

import { useSelector } from 'react-redux';
import NewHome from '../pages/NewHome';

const Navbar = () => {

  const user = useSelector((state) => state.auth.user);
  const userEmail = user ? user.email : null;

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {!userEmail && (
          <>
            <li>
                <Link to="/signup">Sign Up</Link>
            </li>

            <li>
                <Link to="/login">Log In</Link>
            </li>
          </>
        )}

        <li>
          <Link to="/searchbar">Search Bar</Link>
        </li>


        <li>
          <Link to="/newhome">New Home</Link>
        </li>

        { userEmail && (

          <>

        <li>
          <div>{userEmail}</div>
        </li>

        <li>
          <Logout />
        </li>

        <li>
          <Link to="/cart">Cart</Link>
        </li>

        <li>
          <Link to="/admin">Admin Dashboard</Link>
        </li>

        </>

      )}





      {/*
        <li>
          <div>Cart</div> {/*Badge Content from material ui default 4 items/}
        </li>
        */}

      </ul>
    </nav>
  );
};

export default Navbar;
