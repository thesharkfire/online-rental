import React, { useState }from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';
import { useNavigate, Link } from 'react-router-dom';

function Product({product}) {
  /////////////
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const[error, setError] = useState(null)
  const user = useSelector((state) => state.auth.user)

  const navigate = useNavigate();

const handleViewDetails = product => {
  navigate(`/products/${product._id}`);
};

   const onAddToCart = product =>{
    dispatch(addToCart(product));
   }
 
   //Go to the backend and change /upload on express.static to upload, come back and add/

  return (
    <div>
        <img src={`http://localhost:5000${product.image}`} alt={product.title} />
        <h4>{product.title} </h4>
        
           <div>
          <button onClick={() => onAddToCart(product)}>Add to Cart</button>
          </div>
          <div>
          <button onClick={() => handleViewDetails(product)}>View Details</button>

         </div>
    </div>
  )
}

export default Product
