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


  const handleDeleteProduct = async (productId) =>{
          
         try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
              'Authorization': `Bearer ${user.token}`
            }
      });
        
      const json = await response.json()

       if (response.ok) {
        // Handle success (e.g., show a success message)
        console.log('Product deleted successfully');
        dispatch(deleteProduct(json));
        console.log(json);
        //const json = await response.json()

      } else {
        // Handle error (e.g., show an error message)
        setError('Error deleting product');

      }
    } catch (error) {
      setError(error.message);
    }

          

          

        }

const handleViewDetails = product => {
  navigate(`/products/${product._id}`);
};

   const onAddToCart = product =>{
    dispatch(addToCart(product));
   }

   const containerStyle = {
    border: '1px solid #ddd',
    padding: '1px',
    marginBottom: '20px',
    display: 'block', // Adjust the display property
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
    <div style={containerStyle}>
       
        <h4 style={{ margin: '10px 0' }}>{product.title} </h4>
         <img src={`http://localhost:5000${product.image}`} alt={product.title} style={{ width: '200px', height: '200px',  }} />
        <div>
           <div>
      <button onClick={() => handleViewDetails(product)} style={buttonStyle} >View Details</button>
      </div>
      <div>
      <button onClick={() => handleDeleteProduct(product._id)} style={{ ...buttonStyle, backgroundColor: '#28a745' }} >Delete</button>
      </div>
    </div>
    </div>
  )
}

export default Product
