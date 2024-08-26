import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from './Product';
import { setProducts } from '../redux/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();

  //Get user
       const user = useSelector((state) => state.auth.user);

    //New
   // co nst [products, setProducts] = useState(null);
  const products = useSelector((state) => state.products);
  
  const productGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', // Four columns
    gap: '1rem', // Gap between products
  };

  useEffect(() => {

    const fetchProducts = async() =>{
      const response = await fetch('http://localhost:5000/api/products/',{
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if(response.ok){
        dispatch(setProducts(json));
      }
    }
    if(user){
    fetchProducts()//Remove if user to be regular
  }

  }, [dispatch, user]);


  return (
  <>

  <div className = "products" style={productGridStyle}>
      {products && products.map((product) => (
          <Product key = {product._id} product ={product} />

                    ))}
  </div>

  </>
  );
}

export default ProductList;
