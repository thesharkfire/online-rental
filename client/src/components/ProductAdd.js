import React, { useState } from 'react';
//Makes use of Signup page css, since they are so similar
import '../pages/Signup.css';
import { createProduct } from '../redux/productSlice';
import { useSelector, useDispatch } from 'react-redux';

const ProductAdd = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const[error, setError] = useState(null)

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.auth.user)

        const handleSubmit = async (e) =>{
          e.preventDefault()

          if(!user){
            setError('You must be logged in')
            console.log('You must be logged in to add')
            return
          }

          const formData = new FormData();
          formData.append('title', title);
          formData.append('author', author);
          formData.append('desc', desc);
          formData.append('price', price);
          formData.append('image', image);
          
          const response = await fetch('http://localhost:5000/api/products/',{
            method: 'POST',
            body: formData,
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })

          const json = await response.json()

          if(!response.ok){
            setError(json.error)

          }

          if(response.ok){
            dispatch(createProduct(json))
            setTitle('')
            setAuthor('')
            setDesc('')
            setImage(null);
            setError(null)
            console.log('New product added',json)

          }


        }

  return (
    <form onSubmit={handleSubmit} enctype= "multipart/form-data"> 

      <h3>Add a New product</h3>



      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="desc">Description:</label>
        <input
          type="text"
          id="desc"
          value={desc}
          onChange={(event) => setDesc(event.target.value)}
        />
      </div>
      <div>
      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
      </div>
    

    <div>
      <label htmlFor="img">Image</label>
      <input
        type="file"
        onChange={event => setImage(event.target.files[0])}
        name = "image"
      />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductAdd;
