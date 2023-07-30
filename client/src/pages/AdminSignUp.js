import React, { useState } from 'react';
import './Signup.css';
import { login } from '../redux/authSlice';

import { useSelector, useDispatch } from 'react-redux';

const AdminSignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');

  //New
  const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);

  const dispatch = useDispatch();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //New
    setIsLoading(true)
	  setError(null)


    const response = await fetch('http://localhost:5000/api/user/signup/admin/',{
      method: 'POST',
      body: JSON.stringify({name, email, password, accessCode}),
      headers: {
        'Content-Type':'application/json'
      }
    })

    const json = await response.json()//auth

    if(!response.ok){
      setIsLoading(false)
      setError(json.error)

    }

    if(response.ok){
			  dispatch(login(json));
			  localStorage.setItem('auth', JSON.stringify(json));
			  setIsLoading(false)


      }




    // Handle form submission here
    console.log(email, password)



  };

  /**
   * useEffect(() => {
    // Load the authentication details from local storage when the component mounts
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth) {
      dispatch(login(auth));
    }
  }, [dispatch]);
   */

  return (

    <form onSubmit={handleFormSubmit}>
        <h3>Sign Up</h3>

      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

        <div>
      <label>  Access Code:</label>
        <input
          type="password"
          value={accessCode}
          onChange={(event) => setAccessCode(event.target.value)}
        />
        </div>

      <button disabled ={isLoading} type="submit">Sign Up</button>
      {error && <div> {error}</div>}
    </form>




  );
};

export default AdminSignUp;
