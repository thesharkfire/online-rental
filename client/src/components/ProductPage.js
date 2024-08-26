import React, { useState, useEffect }from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, setProducts } from '../redux/productSlice';
import { useHistory, useParams } from 'react-router-dom';
import ReviewSection from './ReviewSection';
import { useCart } from '../contexts/cartContext';// Import the useCart hook


function ProductPage() {// {product}  prop
  /////////////
  //const dispatch = useDispatch();
  const { dispatch } = useCart();
  //const products = useSelector((state) => state.products);
  const[error, setError] = useState(null)
  const[product, setProduct] = useState(null)


  const { productId } = useParams();

  //console.log(product)
  useEffect(() => {
     fetch(`http://localhost:5000/api/products/${productId}`)
       .then(res => res.json())
       .then(data => setProduct(data));

      
  

   }, [productId]);

   if (!product) {
     return <h2>Loading...</h2>;
   }

const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    marginTop: '10px',
  };

/*
   const onAddToCart = product =>{
    console.log(product)
    dispatch(addToCart(product));
   }*/

const onAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product }); // Dispatch the action
  };




/*
  const history = useHistory();

  const handleViewDetails = product => {
   history.push(`/products/${product.id}`);
   };

  */



  /////////////

  return (
    <div>
          <h4>{product.title} </h4>
          <img src={`http://localhost:5000${product.image}`} alt={product.title} style={{ width: '200px', height: '200px' }} />
          <p>{product.author} </p>
          <p> Rental Price: Ksh {product.price} </p>
           <p>{product.category} </p>
          
           


             <div>
           
          <button onClick={() => onAddToCart(product)} style={buttonStyle}>Add to Cart</button>
          </div>
          <p>{product.desc} </p>

          {/*
          <p>{product.createdAt} </p>
          <button onClick={() => onAddToCart(product)}>Add to Cart</button>*/}
          <ReviewSection product = {product} />
          
    </div>
  )
}

export default ProductPage
