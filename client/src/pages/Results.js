// Results.js
import React from 'react';
import { addToCart } from '../redux/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/cartContext';

 



const Results = () => {

const products = useSelector((state) => state.searchResults);
  const navigate = useNavigate();
  //const dispatch = useDispatch();
  const { dispatch } = useCart();

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



  
  return (
    <div>
      <h1>Search Results</h1>
      {products.map((product) => (
        <div key={product._id}  style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '20px' }}>
        <img src={`http://localhost:5000${product.image}`} alt={product.title} style={{ width: '200px', height: '200px' }} />
          <h2>{product.title}</h2>
          <div>
          <button onClick={() => onAddToCart(product)} style={buttonStyle}>Add to Cart</button>
         </div>
         <div>
          <button onClick={() => handleViewDetails(product)} style={{ ...buttonStyle, backgroundColor: '#28a745' }} >View Details</button>
        </div>
          
        </div>
      ))}
    </div>
  );
};

export default Results;
