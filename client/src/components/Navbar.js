import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logout from './Logout';
//import Cart from
import { ShoppingCart } from '@material-ui/icons'; // Import the cart icon

import { useSelector } from 'react-redux';
//import NewHome from '../pages/NewHome';
import { useCart } from '../contexts/cartContext';
import  { useContext } from 'react';


const Navbar = () => {
  //const cart = useSelector(state => state.cart); 
 const { state } = useCart();
const { cart } = state; // Import CartContext and use it here
const cartItemsCount  = cart.length;;


  const user = useSelector((state) => state.auth.user) || "";
  const userEmail = user ? user.email : null;
  const userLogged = user ? true : false;
  var userAdmin = false
  var userAuth = false
 
 // console.log(userEmail);

  if(user.role === 'admin'){//admin, user
    var userAdmin = true 
  } 

  if(user.role === 'user'){//admin, user
    var userAuth = true 
  } 
 
 

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {!userLogged && (
          <>
            <li>
                <Link to="/signup">Sign Up</Link>
            </li>

            <li>
                <Link to="/login">Log In</Link>
            </li>
          </>
        )}

        


        

        { userLogged && (

          <>

        <li>
          <div>{userEmail}</div>
        </li>

        <li>
          <Logout />
        </li>



         {userAuth && (
          <>
            <li>
          <Link to="/cart">Cart {cartItemsCount > 0 && <span>({cartItemsCount})</span>} </Link>
        </li>
          </>
        )}

         {userAdmin && (
          <>
             <li>
          <Link to="/admin">Admin Dashboard</Link>
        </li>
          </>
        )}

        

         <li>
          <Link to="/orders">Orders</Link>
        </li>
        
        <li>
          <Link to="/searchbar">Search Bar</Link>
        </li>
       
        </>

      )}





      {/*
        <li>
          <div>Cart</div> {/*Badge Content from material ui default 4 items/}
        </li>

        <li>
          <Link to="/newhome">New Home</Link>
        </li>
        */}

      </ul>
    </nav>
  );
};

export default Navbar;
