import React, { useState }from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/productSlice';//
//import { addToCart } from '../redux/cartSlice';
import { useNavigate, Link } from 'react-router-dom';

import { useCart } from '../contexts/cartContext';// Import the useCart hook

function Product({product}) {
  /////////////
  //const dispatch = useDispatch();
 const { dispatch } = useCart();
    
  const products = useSelector((state) => state.products);
  const[error, setError] = useState(null)
  const user = useSelector((state) => state.auth.user)

  const navigate = useNavigate();

const handleViewDetails = product => {
  navigate(`/products/${product._id}`);
};
/*
   const onAddToCart = product =>{
    console.log(product)
    dispatch(addToCart(product));
   }*/

const onAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product }); // Dispatch the action
  };


 const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    marginTop: '10px',
  };
   //Go to the backend and change /upload on express.static to upload, come back and add/

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '20px' }}>
        <img src={`http://localhost:5000${product.image}`} alt={product.title} style={{ width: '200px', height: '200px' }} />
        <h4 style={{ margin: '10px 0' }} >{product.title} </h4>
         <p>{product.author} </p>
          <p>{product.category} </p>
           <p> Rental Price: Ksh {product.price} </p>
           <div>
           
          <button onClick={() => onAddToCart(product)} style={buttonStyle}>Add to Cart</button>
          </div>
          <div>
          <button onClick={() => handleViewDetails(product)} style={{ ...buttonStyle, backgroundColor: '#28a745' }} >View Details</button>

         </div>
    </div>
  )
}

export default Product
