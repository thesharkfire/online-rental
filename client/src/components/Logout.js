import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice'

function Logout() {
    
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);// Maybe not needed, handle logout  below

    const handleClick = async (e) =>{
        
        
        dispatch(logout());
        localStorage.removeItem('auth');
    
      }

  return (
    <div>
         <button onClick={handleClick}> logout </button>
    </div>
  )
  
}

export default Logout