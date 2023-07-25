import React, { useState, useEffect }from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, setProducts } from '../redux/productSlice';
import { useHistory, useParams } from 'react-router-dom';
import ReviewSection from './ReviewSection';

function ProductPage() {// {product}  prop
  /////////////
  const dispatch = useDispatch();
  //const products = useSelector((state) => state.products);
  const[error, setError] = useState(null)
  const[product, setProduct] = useState(null)


  const { productId } = useParams();


  useEffect(() => {
     fetch(`http://localhost:5000/api/products/${productId}`)
       .then(res => res.json())
       .then(data => setProduct(data));

      
  

   }, [productId]);

   if (!product) {
     return <h2>Loading...</h2>;
   }





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
          <img src={`/api/images/${product._id}`} alt={product.title} />
          {/*
          <p>{product.createdAt} </p>
          <button onClick={() => onAddToCart(product)}>Add to Cart</button>*/}
          <ReviewSection product = {product} />
          
    </div>
  )
}

export default ProductPage
